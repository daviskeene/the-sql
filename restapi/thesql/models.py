from django.db import models

# Create your models here.


class Classroom(models.Model):
    classroom_id = models.IntegerField(primary_key=True)
    classroom_name = models.CharField(max_length=300)
    classroom_description = models.CharField(max_length=1000)


class Assignment(models.Model):
    assignment_id = models.IntegerField(primary_key=True)
    assignment_name = models.CharField(max_length=300)
    assignment_description = models.CharField(max_length=1500)
    assignment_points = models.IntegerField()
    assignment_code = models.CharField(max_length=1000)
    assignment_test_cases = models.CharField(max_length=5000)
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE, related_name='assignments')


class Teacher(models.Model):
    teacher_id = models.IntegerField(primary_key=True)
    email = models.CharField(max_length=300)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE, related_name='teachers')


class Student(models.Model):
    student_id = models.IntegerField(primary_key=True)
    email = models.CharField(max_length=300)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE, related_name='students')


class AssignmentGrade(models.Model):
    assignment_grade_id = models.IntegerField(primary_key=True)
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='grades')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='grades')
    points_earned = models.IntegerField()
    points_total = models.IntegerField()
