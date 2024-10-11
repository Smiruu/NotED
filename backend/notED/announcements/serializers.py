from rest_framework import serializers
from .models import *

class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = '__all__'
        read_only_fields = ['group', 'user']  # Make group and user read-only
