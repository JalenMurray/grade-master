from rest_framework.permissions import BasePermission


class UserDetailAccessPermission(BasePermission):
    message = "A user can only view info about themselves"

    def has_object_permission(self, request, view, obj):
        print(obj)
        print(request.user)
        return obj == request.user
