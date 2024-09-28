from django.urls import path
from .views import *

urlpatterns = [
    path('get/', get_to_do_list),
    path('create/', create_to_do_list),
    path('update/<int:_id>/', update_to_do_list),  # Match `_id` parameter
    path('delete/<int:_id>/', delete_to_do_list),  # Match `_id` parameter
]
