from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import SemesterSerializer, ClassSerializer, AssignmentTypeSerializer, AssignmentSerializer
from grademaster.models import Semester, Class, AssignmentType, Assignment
from .permissions import SemesterUserAccessPermission, ClassUserAccessPermission, AssignmentTypeUserAccessPermission,\
    AssignmentUserAccessPermission, CanCreateAssignmentType, CanCreateAssignment


class SemesterList(generics.ListCreateAPIView):
    serializer_class = SemesterSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Semester.objects.filter(user=user)


class SemesterDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [SemesterUserAccessPermission]
    queryset = Semester.objects.all()
    serializer_class = SemesterSerializer


class ClassList(generics.ListCreateAPIView):
    serializer_class = ClassSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Class.objects.filter(user=user)


class ClassDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [ClassUserAccessPermission]
    queryset = Class.objects.all()
    serializer_class = ClassSerializer


class AssignmentTypeList(generics.ListCreateAPIView):
    serializer_class = AssignmentTypeSerializer
    permission_classes = [CanCreateAssignmentType]

    def get_queryset(self):
        user = self.request.user
        return AssignmentType.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AssignmentTypeDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AssignmentTypeUserAccessPermission]
    queryset = AssignmentType.objects.all()
    serializer_class = AssignmentTypeSerializer


class AssignmentList(generics.ListCreateAPIView):
    serializer_class = AssignmentSerializer
    permission_classes = [CanCreateAssignment]

    def get_queryset(self):
        user = self.request.user
        return Assignment.objects.filter(user=user)

    def perform_create(self, serializer):
        print("TESTING")
        serializer.save(user=self.request.user)


class AssignmentDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AssignmentUserAccessPermission]
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
