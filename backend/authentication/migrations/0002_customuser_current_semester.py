# Generated by Django 5.0.1 on 2024-02-08 19:56

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
        ('grademaster', '0004_alter_assignment_weight'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='current_semester',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='grademaster.semester'),
        ),
    ]
