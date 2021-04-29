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

    print(email)
    print(query)
    print(assigment_id)

    student = Student.objects.get(email=email)
    assignment = Assignment.objects.get(assignment_id=assigment_id)

    if assignment is None or student is None:
        print("Assignment or Student is invalid!")
        return JsonResponse({
            "error": f"Assignment or Student is invalid! a - {assignment}, s - {student}"
        })

    test_cases = parse_test_cases(assignment.assignment_test_cases) # array of expected row values (as str)
    num_correct = 0
    with connection.cursor() as cur:
        # validate the query
        if validate_query(query):
            cur.execute(query)
            results = cur.fetchall()
            for i, row in enumerate(results):
                test_row = test_cases[i]
                str_row = [str(x) for x in row]  # cast all elements in the result to a string
                num_same = len(set(test_row).union(str_row))

                if num_same == len(test_row):
                    num_correct += 1

    points_earned = int((num_correct / len(test_cases)) * assignment.assignment_points)

    assignment_grade = AssignmentGrade.objects.filter(student=student, assignment=assignment)  # type: list
    print(assignment_grade)

    if not assignment_grade:
        # If the assignment grade isn't created, make one
        assignment_grade = AssignmentGrade.objects.create(student=student, assignment=assignment,
                                                          assignment_grade_id=generate_random_number(10))
    else:
        assignment_grade = assignment_grade[0]

    print(assignment_grade)

    assignment_grade.points_total = assignment.assignment_points

    if assignment_grade.points_earned < points_earned:
        assignment_grade.points_earned = points_earned

    assignment_grade.save()  # commit to database

    return JsonResponse({
        "status": "success",
        "points_total": assignment.assignment_points,
        "points_earned": points_earned
    })


def run_query(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    query = body['query']

    with connection.cursor() as cur:
        if validate_query(query):
            cur.execute(query)
            ## TODO: Pretty format the response
            result = cur.fetchall()
            outputarr = []
            for row in result:
                output = ''
                for word in row:
                    if output == '':
                        output = output + str(word)
                    else:
                        output = output + ' , ' + str(word)
                outputarr.append(output)

    return JsonResponse({
        "result": outputarr
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