from rest_framework import serializers
from grademaster.models import Semester, Class, AssignmentType, Assignment
from rest_framework.serializers import ModelSerializer, SerializerMethodField, FloatField


class AssignmentSerializer(ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Assignment
        fields = '__all__'


class AssignmentTypeSerializer(ModelSerializer):
    assignments = AssignmentSerializer(many=True, read_only=True)
    total_score = FloatField(read_only=True)
    max_total_score = FloatField(read_only=True)
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = AssignmentType
        fields = '__all__'


class ClassSerializer(ModelSerializer):
    assignment_types = AssignmentTypeSerializer(many=True, read_only=True)
    score = FloatField(required=False)
    semester_str = SerializerMethodField()
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Class
        fields = '__all__'

    def get_semester_str(self, obj):
        return str(obj.semester)


class PartialClassSerializer(ModelSerializer):
    score = FloatField()

    class Meta:
        model = Class
        fields = '__all__'


class SemesterSerializer(ModelSerializer):
    classes = PartialClassSerializer(many=True, read_only=True)
    gpa = FloatField(read_only=True)
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Semester
        fields = '__all__'
