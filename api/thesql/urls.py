from django.urls import include, path
from django.views.decorators.csrf import csrf_exempt
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'students', views.StudentViewSet)
router.register(r'teachers', views.TeacherViewSet)
router.register(r'assignments', views.AssignmentViewSet)
router.register(r'assignmentgrades', views.AssignmentGradeViewSet)
router.register(r'classrooms', views.ClassroomViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('davis/', views.advanced_query_davis, name='davis'),
    path('cesar/', views.advanced_query_cesar, name='cesar'),
    path('pakhi/', views.advanced_query_pakhi, name='pakhi'),
    path('shivangi/', views.advanced_query_shivangi, name='shivangi'),
    path('grade/', csrf_exempt(views.grade_assignment), name='grade'),
    path('run/', csrf_exempt(views.run_query), name='run_query'),
    path('classroom-assignments/', views.get_assignments_in_classroom, name='classroom-assignments'),
    path('create-test-cases/', csrf_exempt(views.create_test_cases), name='create-test-cases'),
    path('assignments-per-student/', csrf_exempt(views.get_student_assignments), name='get-assignments')
]