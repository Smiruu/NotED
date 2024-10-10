from django.db import models
from django.conf import settings
from groups.models import Group  # Correct import for Group
import os
from django.core.validators import FileExtensionValidator

# Custom file and video upload functions
def upload_to_file(instance, filename):
    title_str = str(instance.title)
    return os.path.join('files', title_str, filename)

def upload_to_video(instance, filename):
    title_str = str(instance.title)
    return os.path.join('videos', title_str, filename)

class Title(models.Model):
    _id = models.AutoField(primary_key=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)  # Referencing the Group model correctly
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    
    def __str__(self):
        return f"Title for '{self.name}'"

class File(models.Model):
    _id = models.AutoField(primary_key=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)  # Referencing the Group model correctly
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.ForeignKey(Title, on_delete=models.CASCADE)
    section = models.PositiveIntegerField(null=True, blank=True)
    text = models.TextField(null=True, blank=True)
    file = models.FileField(
        upload_to=upload_to_file,
        null=True, 
        blank=True,
        validators=[FileExtensionValidator(allowed_extensions=['pdf', 'jpg', 'jpeg', 'png'])]
    )

    def __str__(self):
        return f"File for '{self.title}'"

class Video(models.Model):
    _id = models.AutoField(primary_key=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)  # Referencing the Group model correctly
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.ForeignKey(Title, on_delete=models.CASCADE)
    link = models.URLField(null=True, blank=True)
    video = models.FileField(
        upload_to=upload_to_video,
        null=True, 
        blank=True,
        validators=[FileExtensionValidator(allowed_extensions=['mp4'])]
    )

    def __str__(self):
        return f"Video for '{self.title}'"
