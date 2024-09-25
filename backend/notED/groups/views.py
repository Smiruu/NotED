from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Group
from user.models import User
from .serializers import GroupSerializer
from django.shortcuts import get_object_or_404

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_group(request):
    # Create the serializer with the provided data
    serializer = GroupSerializer(data=request.data)
    user_id = request.data.get('user_id')
    
    user = get_object_or_404(User, pk=user_id)

    # Check if the serializer is valid
    if serializer.is_valid():
        group = serializer.save(user=user)  # Save the group with the user as creator
        
        # If no group image is provided, you can set a default image or handle it here
        if not request.data.get('group_image'):
            # Optionally set a default image path
            group.group_image = 'group_images/default.jpg'  # Change to your default image path
            group.save()  # Save changes if you set a default image
        
        return Response(GroupSerializer(group).data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def join_group(request):
    user_id = request.data.get('user_id')  # Get the currently authenticated user
    group_tag = request.data.get('group_tag')  # Get the group ID from the request data
    
    # Retrieve the group object or return a 404 if not found
    group = get_object_or_404(Group, group_tag=group_tag)
    user = get_object_or_404(User, pk=user_id)
    # Add the user to the group's members
    group.members.add(user)  # Add the user to the members of the group
    group.save()  # Save the changes to the group

    return Response({'message': 'Successfully joined the group.'}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_groups(request):
    user_id = request.data.get('user_id')  # Get the currently authenticated user
    user = get_object_or_404(User, pk=user_id)

    # Fetch groups created by the user
    created_groups = Group.objects.filter(user=user)

    # Fetch groups the user is a member of
    joined_groups = Group.objects.filter(members=user)

    # Serialize the data
    created_groups_data = GroupSerializer(created_groups, many=True).data
    joined_groups_data = GroupSerializer(joined_groups, many=True).data

    return Response({
        'created_groups': created_groups_data,
        'joined_groups': joined_groups_data
    }, status=status.HTTP_200_OK)
