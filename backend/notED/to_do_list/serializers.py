from rest_framework import serializers
from .models import ToDoList

class ToDoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDoList
        fields = ['_id','title', 'completed']  # Include any other fields you want to accept
        