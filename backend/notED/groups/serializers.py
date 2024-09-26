# serializers.py
from rest_framework import serializers
from .models import Group

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['name', 'group_image', 'group_tag']  # Include any other fields you want to accept
