from rest_framework.permissions import BasePermission
from grademaster.models import Semester, Class, AssignmentType


class SemesterUserAccessPermission(BasePermission):
    message = "Viewing/Editing a semester is restricted to the owner only"

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class ClassUserAccessPermission(BasePermission):
    message = "Viewing/Editing a class is restricted to the owner only"

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class AssignmentTypeUserAccessPermission(BasePermission):
    message = "Viewing/Editing an assignment type is restricted to the owner only"

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class AssignmentUserAccessPermission(BasePermission):
    message = "Viewing/Editing an assignment is restricted to the owner only"

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class CanCreateAssignmentType(BasePermission):
    message = "Creating assignment types is restricted to the owner of the class only"

    def has_permission(self, request, view):
        class_id = request.data.get('associated_class')
        cls = Class.objects.get(id=class_id)
        return cls.user == request.user


class CanCreateAssignment(BasePermission):
    message = "Creating assignments is restricted to the owner of the assignment type only"

    def has_permission(self, request, view):
        at_id = request.data.get('assignment_type')
        at = AssignmentType.objects.get(id=at_id)
        return at.user == request.user
