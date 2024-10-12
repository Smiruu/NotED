from django.db import models
from django.conf import settings
from groups.models import Group


# Create your models here.
class Announcement(models.Model):
    _id = models.AutoField(primary_key=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE) 
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    text = models.TextField(null=True, blank=True)
    link = models.URLField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.title