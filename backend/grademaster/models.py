from django.db import models
from django.conf import settings
from django.db.models import Model, CharField, IntegerField, FloatField, ForeignKey,\
    BooleanField
from django.contrib.auth.models import User
from .utils import get_gpa


class Semester(Model):
    season = CharField(max_length=7, choices=[('Spring', 'Spring'), ('Summer', 'Summer'), ('Fall', 'Fall'),
                                              ('Winter', 'Winter')])
    year = IntegerField()
    current = models.BooleanField(default=False)
    user = ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='semesters')

    def __str__(self):
        return f'{self.season} {self.year}'

    @property
    def gpa(self):
        classes = Class.objects.filter(semester=self)
        return get_gpa(classes)

    def save(self, *args, **kwargs):
        if self.current:
            Semester.objects.update(current=False)
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        is_current = self.current
        super().delete(*args, **kwargs)
        if is_current:
            latest_semester = Semester.objects.order_by('-year', '-season').first()
            if latest_semester:
                latest_semester.current = True
                latest_semester.save()


class Class(Model):
    code = CharField(max_length=20)
    title = CharField(max_length=255)
    semester = ForeignKey(Semester, on_delete=models.CASCADE, related_name='classes')
    desired_score = FloatField(default=100.0)
    units = IntegerField(verbose_name='Units/Credits')
    display_color = CharField(max_length=10, default='#FFFFFF')
    user = ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='classes')

    def __str__(self):
        return f'{self.code} {self.title}'

    @property
    def score(self):
        a_types = AssignmentType.objects.filter(associated_class=self)
        score = 0.0

        for at in a_types:
            assignments = Assignment.objects.filter(assignment_type = at)
            for a in assignments:
                weighted_score = (a.score / a.max_score) * a.weight
                score += weighted_score
        return score

    def save(self, *args, **kwargs):
        if not self.pk:
            self.user = self.semester.user
        super().save(*args, **kwargs)


class AssignmentType(Model):
    name = CharField(max_length=100)
    max_score = FloatField(blank=True, null=True, default=100.0)
    weight = FloatField(blank=True, null=True)
    associated_class = ForeignKey(Class, on_delete=models.CASCADE, related_name='assignment_types')
    default_name = CharField(max_length=100)
    lock_weights = BooleanField(default=False)
    user = ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='assignment_types')

    def __str__(self):
        return self.name

    @property
    def total_score(self):
        assignments = Assignment.objects.filter(assignment_type=self)
        if not assignments:
            return 0
        total_score = sum((a.score / a.max_score) * a.weight for a in assignments)
        return total_score

    @property
    def max_total_score(self):
        assignments = Assignment.objects.filter(assignment_type=self)
        max_total_score = sum(a.weight for a in assignments)
        return max_total_score

    def balance_weight(self):
        if self.lock_weights:
            assignments = Assignment.objects.filter(assignment_type=self)
            num_assignments = assignments.count()
            num_weight = self.weight / num_assignments if num_assignments else 0
            assignments.update(weight=num_weight)
        else:
            self.weight = sum([a.weight for a in Assignment.objects.filter(assignment_type=self)])
            self.save()

    def save(self, *args, **kwargs):
        if not self.pk:
            self.score = self.max_score
            self.user = self.associated_class.user
        if self.lock_weights:
            self.balance_weight()
        super().save(*args, **kwargs)


class Assignment(Model):
    name = CharField(max_length=100)
    score = FloatField()
    max_score = models.FloatField(null=True, blank=True)
    weight = FloatField(default=0.0)
    assignment_type = ForeignKey(AssignmentType, on_delete=models.CASCADE, related_name='assignments')
    user = ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='assignments')

    def __str__(self):
        return f'{self.name}\t{self.score} / {self.assignment_type.max_score}'

    def save(self, *args, **kwargs):
        if not self.pk:
            self.user = self.assignment_type.user
        super().save(*args, **kwargs)
        self.assignment_type.balance_weight()

    def delete(self, *args, **kwargs):
        at = self.assignment_type
        super().delete(*args, **kwargs)
        at.balance_weight()
