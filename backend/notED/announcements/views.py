from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import *
from groups.models import Group
from .serializers import *
from django.shortcuts import get_object_or_404


# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAnnouncements(request, group_tag):
    group = get_object_or_404(Group, group_tag=group_tag)
    user = request.user

    # Check if the user is either the group creator or a member of the group
    if user != group.user and user not in group.members.all():
        return Response({'message': 'You are not a member of this group.'}, status=status.HTTP_403_FORBIDDEN)

    announcements = Announcement.objects.filter(group=group)
    serializer = AnnouncementSerializer(announcements, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createAnnouncement(request, group_tag):
    group = get_object_or_404(Group, group_tag=group_tag)
    user = request.user

    # Check if the user is the group creator
    if user != group.user:
        return Response({'message': 'You are not the creator of this group.'}, status=status.HTTP_403_FORBIDDEN)

    serializer = AnnouncementSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(group=group, user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteAnnouncement(request, group_tag, announcement_id):
    group = get_object_or_404(Group, group_tag=group_tag)
    user = request.user
    announcement = get_object_or_404(Announcement, _id=announcement_id)

    # Check if the user is the group creator
    if user != group.user:
        return Response({'message': 'You are not the creator of this group.'}, status=status.HTTP_403_FORBIDDEN)

    announcement.delete()
    return Response({'message': 'Announcement deleted successfully.'})