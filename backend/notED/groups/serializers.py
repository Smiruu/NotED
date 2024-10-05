# serializers.py
from rest_framework import serializers
from .models import Group, Meeting
from datetime import datetime


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['name', 'group_image', 'group_tag']  # Include any other fields you want to accept

class GroupDetailsSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()  # Show the user's name
    members = serializers.StringRelatedField(many=True)  # List members as names

    class Meta:
        model = Group
        fields = ['user', 'group_tag', 'name', 'members', 'group_image']
    def get_members(self, obj):
        member_names = [member.name for member in obj.members.all()]
        print("Member Names:", member_names)  # Debugging line
        return member_names
    
class MeetingSerializer(serializers.ModelSerializer):
    date_time = serializers.CharField()  # Accepting as string
    group_tag = serializers.CharField(source='group.group_tag')

    class Meta:
        model = Meeting
        fields = ['title', 'body', 'date_time', 'group_tag']

    def validate_date_time(self, value):
        # Convert the string to a datetime object
        try:
            return datetime.strptime(value, '%m/%d/%Y %I:%M %p')  
        except ValueError:
            raise serializers.ValidationError("Date and time must be in the format MM/DD/YYYY HH:MM AM/PM.")