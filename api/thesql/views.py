from django.shortcuts import render
from rest_framework import viewsets, filters
from django.db import connection
from django.http import JsonResponse
import json

from .serializers import StudentSerializer, TeacherSerializer, AssignmentSerializer, AssignmentGradeSerializer, ClassroomSerializer
from .models import Student, Teacher, Assignment, AssignmentGrade, Classroom
from .grading.grading_utils import *

# Create your views here.


class StudentViewSet(viewsets.ModelViewSet):
    search_fields = ['first_name', 'last_name', 'email']
    filter_backends = (filters.SearchFilter,)

    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class TeacherViewSet(viewsets.ModelViewSet):
    search_fields = ['first_name', 'last_name', 'email']
    filter_backends = (filters.SearchFilter,)

    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer


class AssignmentViewSet(viewsets.ModelViewSet):
    search_fields = ['assignment_name', 'assignment_description']
    filter_backends = (filters.SearchFilter,)

    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer


class AssignmentGradeViewSet(viewsets.ModelViewSet):
    search_fields = ['assignment_grade_id']
    filter_backends = (filters.SearchFilter,)

    queryset = AssignmentGrade.objects.all()
    serializer_class = AssignmentGradeSerializer


class ClassroomViewSet(viewsets.ModelViewSet):
    search_fields = ['classroom_name', 'classroom_description']
    filter_backends = (filters.SearchFilter,)

    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer


###
#
# GRADING ENDPOINTS
#
###


def grade_assignment(request):
    """
    Grade an assignment and return the response.
    """
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    email, query, assigment_id = body['email'], body['query'], body['assignment_id']
    print(email, query, assigment_id)

    student = Student.objects.filter(email=email)
    assignment = Assignment.objects.filter(assignment_id=assigment_id)
    save_grade = True

    if not assignment:
        print("Assignment is invalid!")
        return JsonResponse({
            "status": "error",
            "result": "Assignment ID is not valid!",
            "points_earned": 0,
            "points_total": 0
        })

    assignment = assignment[0]

    if not student:
        save_grade = False
    else:
        student = student[0]

    test_cases = parse_test_cases(assignment.assignment_test_cases) # array of expected row values (as str)
    num_correct = 0
    outputarr = []

    with connection.cursor() as cur:
        # validate the query
        if validate_query(query):
            try:
                cur.execute(query)
                results = cur.fetchall()

            except Exception as e:
                return JsonResponse({
                    "status": "failure",
                    "result": [str(e)],
                    "points_total": 0,
                    "points_earned": 0
                })

            for row in results:
                output = ''
                for word in row:
                    if output == '':
                        output = output + str(word)
                    else:
                        output = output + ', ' + str(word)
                outputarr.append(output)

            for i, row in enumerate(results):
                test_row= []
                if i < len(test_cases):
                    test_row = test_cases[i]
                row_string = ', '.join(test_row)

                if row_string == outputarr[i]:
                    num_correct += 1
        else:
            return JsonResponse({
                "status": "error",
                "result": ["Keyword 'DROP' or 'DELETE' detected. Please ensure to use read-only operations only."],
                "points_total": 0,
                "points_earned": 0,
                "grade_saved": False
            })

    points_earned = int((num_correct / len(test_cases)) * assignment.assignment_points)

    if save_grade:
        assignment_grade = AssignmentGrade.objects.filter(student=student, assignment=assignment)  # type: list
        print(assignment_grade)
        if not assignment_grade:
            # If the assignment grade isn't created, make one
            assignment_grade = AssignmentGrade.objects.create(student=student, assignment=assignment,
                                                              assignment_grade_id=generate_random_number(10))
        else:
            assignment_grade = assignment_grade[0]

        assignment_grade.points_total = assignment.assignment_points

        if assignment_grade.points_earned < points_earned:
            assignment_grade.points_earned = points_earned

        assignment_grade.save()  # commit to database

    return JsonResponse({
        "status": "success",
        "result": outputarr,
        "points_total": assignment.assignment_points,
        "points_earned": points_earned,
        "grade_saved": save_grade
    })


def run_query(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    query = body['query']

    with connection.cursor() as cur:
        if validate_query(query):
            try:
                cur.execute(query)
                results = cur.fetchall()

            except Exception as e:
                return JsonResponse({
                    "status": "failure",
                    "result": [str(e)],
                })

            cur.execute(query)
            result = cur.fetchall()
            field_names = [i[0] for i in cur.description]
            outputarr = []
            outputarr.append(', '.join(field_names))
            for row in result:
                output = ''
                for word in row:
                    if output == '':
                        output = output + str(word)
                    else:
                        output = output + ', ' + str(word)
                outputarr.append(output)
        else:
            return JsonResponse({
                "status": "error",
                "result": ["Keyword 'DROP' or 'DELETE' detected. Please ensure to use read-only operations only."],
                "points_total": 0,
                "points_earned": 0,
                "grade_saved": False
            })

    return JsonResponse({
        "status": "success",
        "result": outputarr
    })


def create_test_cases(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    query = body['query']

    test_cases_str = generate_test_cases(query, connection)

    return JsonResponse({
        "test_cases": test_cases_str
    })


def get_assignments_in_classroom(request):

    classroom_id = request.GET.get('id')

    if not Classroom.objects.filter(classroom_id=classroom_id):
        return JsonResponse({
            "assignments": []
        })

    assignments = Assignment.objects.filter(classroom__classroom_id=classroom_id).values()

    return JsonResponse({
        "assignments": list(assignments)
    })

def get_student_assignments(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    email = body['email']
    student = Student.objects.filter(email=email)

    if not student:
        return JsonResponse({
            "status": "error",
            "result": []
        })
    else:
        student = student[0]
        classroom = student.classroom

        assignment_grades = AssignmentGrade.objects.filter(student=student).values()
        for assignment_grade in assignment_grades:
            a = Assignment.objects.get(assignment_id=assignment_grade['assignment_id'])
            assignment_grade.update({
                "assignment_name": a.assignment_name
            })

    return JsonResponse({
        "status": "success",
        "result": list(assignment_grades)
    })

###
#
# ADVANCED QUERIES
#
###


def advanced_query_davis(request):
    with connection.cursor() as cursor:
        query = (
    """SELECT st.first_name as First_Name, st.last_name as Last_Name, SUM(ag.points_earned)/SUM(ag.points_total) as Average_Grade_On_Assignments
    FROM test.thesql_student st JOIN test.thesql_assignmentgrade ag ON st.student_id = ag.student_id
    GROUP BY st.student_id
    ORDER BY Average_Grade_On_Assignments desc
    LIMIT 15;""")
        cursor.execute(query)
        results = cursor.fetchall()
        print(results)
        retval = {}
        for row in results:
            first_name, last_name, avg = row
            retval.update({f'{first_name} {last_name}': float(avg)})
        cursor.close()
        return JsonResponse(retval)


def advanced_query_shivangi(request):
        with connection.cursor() as cursor:
            query = (
        """SELECT b.Classroom_ID, b.avgStudents
        FROM ( SELECT CEILING(SUM(a.stu_ids)/COUNT(a.class)) as avgStudents, a.class as Classroom_ID
            FROM ( SELECT COUNT(s.student_id) as stu_ids, c.classroom_id as class
                FROM test.thesql_student s JOIN test.thesql_classroom c ON s.classroom_id = c.classroom_id
            GROUP BY c.classroom_id
        ORDER BY c.classroom_id) as a

        GROUP BY a.class ) as b

        ORDER BY b.avgStudents desc
        LIMIT 15;""")
            cursor.execute(query)
            results = cursor.fetchall()
            print(results)
            retval = {}
            for row in results:
                retval.update({row[0]: int(row[1])})
            cursor.close()
            return JsonResponse(retval)


def advanced_query_cesar(request):
        with connection.cursor() as cursor:
            query = (
        """SELECT st.first_name as First_Name, st.last_name as Last_Name, SUM(ag.points_earned)/SUM(ag.points_total) as Average_Grade_On_Assignments
        FROM test.thesql_student st JOIN test.thesql_assignmentgrade ag ON st.student_id = ag.student_id
        GROUP BY st.student_id
        ORDER BY Average_Grade_On_Assignments desc
        LIMIT 15;""")
            cursor.execute(query)
            results = cursor.fetchall()
            print(results)


def advanced_query_pakhi(request):
        with connection.cursor() as cursor:
            query = (
        """SELECT am.assignment_name Assigment_Name, ((SUM(ag.points_earned)/SUM(ag.points_total))*100) as Average_Grade
    FROM test.thesql_assignment am JOIN test.thesql_assignmentgrade ag ON am.assignment_id = ag.assignment_id
    GROUP BY am.assignment_id
    ORDER BY Average_Grade desc
    LIMIT 15;""")
            cursor.execute(query)
            results = cursor.fetchall()
            print(results)
            retval = {}
            for row in results:
                assignment_name = row[0]
                avg_grade = row[1]
                retval.update({
                    assignment_name: float(avg_grade)
                })
            cursor.close()
            return JsonResponse(retval)