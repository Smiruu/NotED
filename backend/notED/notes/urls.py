from django.urls import path
from .views import *

urlpatterns = [
    path('titles/<str:group_tag>/', getTitles),
    path('titles/create/<str:group_tag>/', createTitle),
    path('titles/edit/<str:group_tag>/<int:title_id>/', editTitle),
    path('titles/delete/<str:group_tag>/<int:title_id>/', deleteTitle),

    path('videos/<str:group_tag>/', getVideos),
    path('videos/create/<str:group_tag>/', createVideo),
    path('videos/edit/<str:group_tag>/<int:video_id>/', editVideo),
    path('videos/delete/<str:group_tag>/<int:video_id>/', deleteVideo),

    path('files/<str:group_tag>/', getFiles),
    path('files/create/<str:group_tag>/', createFile),
    path('files/edit/<str:group_tag>/<int:file_id>/', editFile),
    path('files/delete/<str:group_tag>/<int:file_id>/', deleteFile),
    
]