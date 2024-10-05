from django.urls import path
from .views import *

urlpatterns = [
    path('users/', ListUsersView.as_view(), name='list-users'),
    path('conversations/', UserConversationsView.as_view(), name='user_conversations'),

]
