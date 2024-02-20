from rest_framework import serializers
from rest_framework.serializers import SerializerMethodField
from .models import CustomUser

from api.serializers import SemesterSerializer
from grademaster.models import Semester


class CustomUserSerializer(serializers.ModelSerializer):
    semesters = SemesterSerializer(many=True, read_only=True)
    current_semester = SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ('email', 'user_name', 'password', 'first_name', 'semesters', 'current_semester')
        extra_kwargs = {'password': {'write_only': True}}

    def get_current_semester(self, obj):
        current = Semester.objects.filter(user=obj, current=True).first()
        return current.id

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance