from django.contrib import admin
from .models import Classroom, Teacher, Assignment, AssignmentGrade, Student

# Register your models here.
admin.site.register(Classroom)
admin.site.register(Teacher)
admin.site.register(Assignment)
admin.site.register(AssignmentGrade)
admin.site.register(Student)
