# serializers.py
from rest_framework import serializers
from .models import Group

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