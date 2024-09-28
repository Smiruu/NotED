from django.db import models
from django.conf import settings


# Create your models here.
class ToDoList(models.Model):
    _id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=150)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title