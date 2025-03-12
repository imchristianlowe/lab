from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

# Create your models here.
class AppleUserInfo(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    sub = models.CharField(max_length=120, unique=True)
