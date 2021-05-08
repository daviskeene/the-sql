from rest_framework import serializers
from .models import Student, Teacher, Assignment, AssignmentGrade, Classroom

"""
Define serializers for the REST Framework.
"""


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Student


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Teacher


class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Classroom


class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Assignment


class AssignmentGradeSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = AssignmentGrade

