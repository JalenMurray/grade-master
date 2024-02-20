from django.contrib import admin
from .models import Semester, Class, AssignmentType, Assignment


@admin.register(Semester)
class SemesterAdmin(admin.ModelAdmin):
    list_display = ['season', 'year', 'user', 'current']
    list_filter = ['season',  'year', 'user']
    search_fields = ['season', 'year', 'user']


@admin.register(Class)
class ClassAdmin(admin.ModelAdmin):
    list_display = ['code', 'title', 'semester', 'user']
    list_filter = ['semester', 'units', 'user']
    search_fields = ['code', 'title', 'user']


@admin.register(AssignmentType)
class AssignmentTypeAdmin(admin.ModelAdmin):
    list_display = ['name', 'max_score', 'weight', 'associated_class', 'user']
    list_filter = ['associated_class', 'lock_weights', 'user']
    search_fields = ['name', 'associated_class__code', 'user']


@admin.register(Assignment)
class AssignmentAdmin(admin.ModelAdmin):
    list_display = ['name', 'score', 'max_score', 'weight', 'assignment_type', 'user']
    list_filter = ['assignment_type__name', 'weight', 'user']
    search_fields = ['name', 'assignment_type__name', 'user']
