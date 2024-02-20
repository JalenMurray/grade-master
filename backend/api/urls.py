from django.contrib import admin
from django.urls import path, include
from .views import SemesterList, SemesterDetail, ClassList, ClassDetail, AssignmentTypeList, AssignmentTypeDetail,\
    AssignmentList, AssignmentDetail

app_name = 'api'

urlpatterns = [
    path('semesters/', SemesterList.as_view(), name='semesters'),
    path('semesters/<int:pk>', SemesterDetail.as_view(), name='semester-detail'),
    path('classes/', ClassList.as_view(), name='classes'),
    path('classes/<int:pk>', ClassDetail.as_view(), name='class-detail'),
    path('assignment-types/', AssignmentTypeList.as_view(), name='assignment-types'),
    path('assignment-types/<int:pk>', AssignmentTypeDetail.as_view(), name='assignment-type-detail'),
    path('assignments/', AssignmentList.as_view(), name='assignments'),
    path('assignments/<int:pk>', AssignmentDetail.as_view(), name='assignment-detail')
]
