from uuid import uuid4

from django.db import models


class User(models.Model):
    uid = models.UUIDField(primary_key=True, default=uuid4)
    username = models.CharField(max_length=64, unique=True)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    birthday_date = models.DateField(blank=True, null=True)
    email = models.EmailField(unique=True)
