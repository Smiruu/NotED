import random
from django.db import models
from django.conf import settings
import os

def get_filename_ext(filepath):
    base_name = os.path.basename(filepath)
    name, ext = os.path.splitext(base_name)
    return name, ext

def upload_image_path(instance, filename):
    new_filename = random.randint(1, 3910209312)
    name, ext = get_filename_ext(filename)
    final_filename = "{new_filename}{ext}".format(new_filename=new_filename, ext=ext)
    return "img/{new_filename}/{final_filename}".format(new_filename=new_filename, final_filename=final_filename)

class Group(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    group_tag = models.CharField(max_length=4, unique=True, editable=False)
    name = models.CharField(max_length=100)
    members = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='groups', blank=True)
    group_image = models.ImageField(upload_to='group_images/', null=True, blank=True, default='group_images/default.jpg')
    favorites = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='favorite_groups', blank=True)

    def save(self, *args, **kwargs):
        if not self.pk: 
            while True:
                random_tag = str(random.randint(0, 9999)).zfill(4)
                if not Group.objects.filter(group_tag=random_tag).exists():
                    self.group_tag = random_tag
                    break
        super().save(*args, **kwargs)

    def get_member_names(self):
        return [member.name for member in self.members.all()]  # Get names of all members

    def __str__(self):
        return f"Group {self.name} ({self.group_tag}) created by {self.user.name}"
    
    def delete(self, *args, **kwargs):
        # Delete the image file if it exists
        if self.group_image:
            if os.path.isfile(self.group_image.path):
                os.remove(self.group_image.path)
        super().delete(*args, **kwargs)
