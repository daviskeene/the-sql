from django.shortcuts import render
from rest_framework import viewsets, filters

from .serializers import StudentSerializer, TeacherSerializer, AssignmentSerializer, AssignmentGradeSerializer, ClassroomSerializer
from .models import Student, Teacher, Assignment, AssignmentGrade, Classroom
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
