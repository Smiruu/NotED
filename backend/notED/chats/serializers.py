from rest_framework import serializers
from user.models import Profile

class ListUsersSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.name', read_only=True)
    user_tag = serializers.CharField(source='user.user_tag', read_only=True)
    photo = serializers.ImageField(read_only=True)  # Removed `source` since it's the same field name

    class Meta:
        model = Profile
        fields = ['name', 'user_tag', 'photo']
