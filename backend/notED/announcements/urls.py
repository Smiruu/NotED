from django.urls import path
from .views import *


urlpatterns = [
    path('<str:group_tag>/', getAnnouncements),
    path('create/<str:group_tag>/', createAnnouncement),
    path('delete/<str:group_tag>/<int:announcement_id>/', deleteAnnouncement),
    
]