from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser
import random
import os
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
#Custom User Manager
class UserManager(BaseUserManager):
    def create_user(self, email, name,  password=None, password2=None):
        """
        Creates and saves a User with the given email, name, tc and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            name =  name,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name,  password=None):
        """
        Creates and saves a superuser with the given email, name, tc and password.
        """
        user = self.create_user(
            email,
            password=password,
            name= name, 
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

#Custom User Model
class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name="Email",
        max_length=255,
        unique=True,
    )
    name = models.CharField(max_length=200)
    user_tag = models.CharField(max_length=4, unique=True, blank=True)  # Unique 4-digit ID
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin

    def save(self, *args, **kwargs):
        """Assigns a unique 4-digit user tag if not already assigned."""
        if not self.user_tag:
            self.user_tag = self.generate_unique_user_tag()  # Call the updated method
        super().save(*args, **kwargs)

    def generate_unique_user_tag(self):
        """Generates a unique 4-digit user tag."""
        while True:
            new_tag = str(random.randint(0, 9999)).zfill(4)  # Generates 4-digit tag
            if not User.objects.filter(user_tag=new_tag).exists():  # Ensures it's unique
                return new_tag
            
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    photo = models.ImageField(default='userprofile/default.jpg', upload_to='userprofile/')
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.user.name if self.user.name else "Profile for user " + str(self.user.id)
   
    def get_profile_image(self):
        return self.image.url if self.image else None
    def save(self, *args, **kwargs):
        # Check if the instance already exists
        if self.pk:
            # Get the current instance from the database
            old_instance = Profile.objects.get(pk=self.pk)
            # Check if the photo field is changing
            if old_instance.photo != self.photo:
                # If there is an old image, delete it
                if old_instance.photo and old_instance.photo.name != 'userprofile/default.jpg':
                    # Use os.path.join to construct the full path
                    old_image_path = os.path.join(settings.MEDIA_ROOT, old_instance.photo.name)
                    if os.path.isfile(old_image_path):
                        os.remove(old_image_path)  # Delete the old image from filesystem

        # Call the original save method
        super().save(*args, **kwargs)
    @receiver(post_save, sender=User)
    def create_or_update_user_profile(sender, instance, created, **kwargs):
        if created:
        # Create a profile if the user is newly created
            Profile.objects.create(user=instance)
        else:
        # Ensure the profile is saved when the user is updated
            instance.profile.save()