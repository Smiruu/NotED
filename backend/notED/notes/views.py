from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import *
from groups.models import Group
from user.models import User
from .serializers import *
from django.shortcuts import get_object_or_404

# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTitles(request, group_tag):
    group = get_object_or_404(Group, group_tag=group_tag)
    user = request.user

     # Check if the user is either the group creator or a member of the group
    if user != group.user and user not in group.members.all():
        return Response({'message': 'You are not a member of this group.'}, status=status.HTTP_403_FORBIDDEN)

    titles = Title.objects.filter(group=group)
    serializer = TitleSerializer(titles, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createTitle(request, group_tag):
    group = get_object_or_404(Group, group_tag=group_tag)
    user = request.user

   # Check if the user is either the group creator or a member of the group
    if user != group.user and user not in group.members.all():
        return Response({'message': 'You are not a member of this group.'}, status=status.HTTP_403_FORBIDDEN)

    serializer = TitleSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(group=group, user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editTitle(request, group_tag, title_id):
    group = get_object_or_404(Group, group_tag=group_tag)
    user = request.user
    title = get_object_or_404(Title, _id=title_id)

   # Check if the user is either the group creator or a member of the group
    if user != group.user and user not in group.members.all():
        return Response({'message': 'You are not a member of this group.'}, status=status.HTTP_403_FORBIDDEN)
    
    serializer = TitleSerializer(instance=title, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteTitle(request, group_tag, title_id):
    # Fetch the group based on group_tag
    group = get_object_or_404(Group, group_tag=group_tag)
    user = request.user
    
    # Fetch the title with the matching _id and group
    title = get_object_or_404(Title, _id=title_id, group=group)

    # Check if the user is either the group creator or a member of the group
    if user != group.user and user not in group.members.all():
        return Response({'message': 'You are not a member of this group.'}, status=status.HTTP_403_FORBIDDEN)
    
    # Delete the title if found
    title.delete()
    return Response({'message': 'Title deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)


# Views for Video model
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getVideos(request, group_tag):
    group = get_object_or_404(Group, group_tag=group_tag)
    user = request.user

    # Check if the user is either the group creator or a member of the group
    if user != group.user and user not in group.members.all():
        return Response({'message': 'You are not a member of this group.'}, status=status.HTTP_403_FORBIDDEN)

    videos = Video.objects.filter(group=group)
    serializer = VideoSerializer(videos, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createVideo(request, group_tag,):
    group = get_object_or_404(Group, group_tag=group_tag)
    user = request.user

    # Check if the user is either the group creator or a member of the group
    if user != group.user and user not in group.members.all():
        return Response({'message': 'You are not a member of this group.'}, status=status.HTTP_403_FORBIDDEN)

    serializer = VideoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(group=group, user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editVideo(request, group_tag, video_id):
    group = get_object_or_404(Group, group_tag=group_tag)
    user = request.user
    video = get_object_or_404(Video, _id=video_id)

    # Check if the user is either the group creator or a member of the group
    if user != group.user and user not in group.members.all():
        return Response({'message': 'You are not a member of this group.'}, status=status.HTTP_403_FORBIDDEN)

    serializer = VideoSerializer(instance=video, data=request.data, partial=True)  # Allow partial updates
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteVideo(request, group_tag, video_id):
    group = get_object_or_404(Group, group_tag=group_tag)
    user = request.user
    video = get_object_or_404(Video, _id=video_id)

    # Check if the user is either the group creator or a member of the group
    if user != group.user and user not in group.members.all():
        return Response({'message': 'You are not a member of this group.'}, status=status.HTTP_403_FORBIDDEN)
    
    video.delete()
    return Response({'message': 'Video deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)

# Views for File model
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getFiles(request, group_tag):
    group = get_object_or_404(Group, group_tag=group_tag)
    user = request.user

    # Check if the user is either the group creator or a member of the group
    if user != group.user and user not in group.members.all():
        return Response({'message': 'You are not a member of this group.'}, status=status.HTTP_403_FORBIDDEN)

    files = File.objects.filter(group=group)
    serializer = FileSerializer(files, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createFile(request, group_tag):
    group = get_object_or_404(Group, group_tag=group_tag)
    user = request.user

    # Check if the user is either the group creator or a member of the group
    if user != group.user and user not in group.members.all():
        return Response({'message': 'You are not a member of this group.'}, status=status.HTTP_403_FORBIDDEN)

    serializer = FileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(group=group, user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editFile(request, group_tag, file_id):
    group = get_object_or_404(Group, group_tag=group_tag)
    user = request.user
    file = get_object_or_404(File, _id=file_id)

    # Check if the user is either the group creator or a member of the group
    if user != group.user and user not in group.members.all():
        return Response({'message': 'You are not a member of this group.'}, status=status.HTTP_403_FORBIDDEN)

    serializer = FileSerializer(instance=file, data=request.data, partial=True)

    if serializer.is_valid():
        # If any field in the request is empty, keep the existing value
        for attr, value in serializer.validated_data.items():
            if value is None or value == "":
                setattr(serializer.instance, attr, getattr(file, attr))

        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteFile(request, group_tag, file_id):
    group = get_object_or_404(Group, group_tag=group_tag)
    user = request.user
    file = get_object_or_404(File, _id=file_id)

    # Check if the user is either the group creator or a member of the group
    if user != group.user and user not in group.members.all():
        return Response({'message': 'You are not a member of this group.'}, status=status.HTTP_403_FORBIDDEN)

    file.delete()
    return Response({'message': 'File deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getFilesAndVideosByTitle(request, title_id):
    # Retrieve the title based on title_id
    title = get_object_or_404(Title, pk=title_id)
    user = request.user

    # Check if the user is either the title's creator or a member of the group associated with the title
    if user != title.user and user != title.group.user and user not in title.group.members.all():
        return Response({'message': 'You are not authorized to access this title.'}, status=status.HTTP_403_FORBIDDEN)

    # Retrieve files and videos associated with the title
    files = File.objects.filter(title=title)
    videos = Video.objects.filter(title=title)

    # Serialize the retrieved files and videos
    files_serializer = FileSerializer(files, many=True)
    videos_serializer = VideoSerializer(videos, many=True)

    # Return a combined response
    return Response({
        'files': files_serializer.data,
        'videos': videos_serializer.data
    })