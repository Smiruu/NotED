from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser
import random
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