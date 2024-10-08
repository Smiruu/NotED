from rest_framework import serializers
from .models import Title, File, Video

# Title Serializer
class TitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Title
        fields = '__all__'
        read_only_fields = ['group', 'user']  # Make group and user read-only

# File Serializer
class FileSerializer(serializers.ModelSerializer):
    title = serializers.SlugRelatedField(
        slug_field='_id',
        queryset=Title.objects.all()  # Fetch from Title model
    )

    class Meta:
        model = File
        fields = '__all__'
        read_only_fields = ['group', 'user']  # Make group and user read-only

def validate(self, attrs):
    # Check if self.instance is None
    if self.instance:
        # Check if title, section, text, or file is provided, if not keep existing value
        if 'title' in attrs and (attrs['title'] is None or attrs['title'] == ""):
            attrs['title'] = self.instance.title  # Keep existing title
        if 'section' in attrs and (attrs['section'] is None or attrs['section'] == ""):
            attrs['section'] = self.instance.section  # Keep existing section
        if 'text' in attrs and (attrs['text'] is None or attrs['text'] == ""):
            attrs['text'] = self.instance.text  # Keep existing text
        if 'file' in attrs and (attrs['file'] is None or attrs['file'] == ""):
            attrs['file'] = self.instance.file  # Keep existing file

    return attrs
def create(self, validated_data):
        # Custom create method if necessary
        return super().create(validated_data)

def update(self, instance, validated_data):
        # Custom update method to handle partial updates
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

    

# Video Serializer
class VideoSerializer(serializers.ModelSerializer):
    title = serializers.SlugRelatedField(
        slug_field='_id',  # Use '_id' field as the slug for Title
        queryset=Title.objects.all()  # Fetch from Title model
    )

    class Meta:
        model = Video
        fields = '__all__'
        read_only_fields = ['group', 'user']  # Make group and user read-only

    def validate(self, attrs):
        # Check if title, link, or video is provided, if not keep existing value
        if 'title' in attrs and attrs['title'] is None:
            attrs['title'] = self.instance.title  # Keep existing title
        if 'link' in attrs and attrs['link'] is None:
            attrs['link'] = self.instance.link  # Keep existing link
        if 'video' in attrs and attrs['video'] is None:
            attrs['video'] = self.instance.video  # Keep existing video

        return attrs