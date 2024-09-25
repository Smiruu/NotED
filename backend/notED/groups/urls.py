# urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('create/', create_group, name='create-group'),
    path('join/', join_group, name='join-group'),
    path('user-groups/', user_groups, name='user-groups'),
]
