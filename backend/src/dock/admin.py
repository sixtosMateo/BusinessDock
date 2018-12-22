from django.db import models
from django.contrib.auth.models import User


class Employee(models.Model):

    employeeId = models.CharField(max_length = 30, default=None)
    firstName = models.CharField(max_length = 30, default=None)
    lastName = models.CharField(max_length = 30, default=None)
    storeId = models.IntegerField(default = 0, blank=True)
    birthDate = models.DateField(blank=True)
    age = models.IntegerField(default = 0, blank=True)
    employmentType = models.CharField(max_length = 30, default=None)


    createdAt = models.DateTimeField(default=timezone.now)
