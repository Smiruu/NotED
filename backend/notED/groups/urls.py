# urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('create/', create_group, name='create-group'),
    path('upload-image/<str:group_tag>/', upload_group_image, name='upload-group-image'),
    path('remove-image/<str:group_tag>/', remove_group_image, name='remove-group-image'),

    path('join/', join_group, name='join-group'),
    path('leave/', leave_group, name='leave-group'),
    path('add-favorite/', add_favorite_group, name='add-favorite-group'),
    path('remove-favorite/', remove_favorite_group, name='remove-favorite-group'),
    path('user-groups/', user_groups, name='user-groups'),
    path('list/', groups_list, name='list_groups'),
    path('details/<str:group_tag>/', get_group_details, name='group-details'),
    path('delete/<str:group_tag>/', delete_group, name='delete_group'),

    path('meetings/create/', create_meeting, name='create_meeting'),
    path('<str:group_tag>/meetings/', get_group_meetings, name='get_group_meetings'),
    
]
