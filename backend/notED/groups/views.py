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
    
    serializer = GroupSerializer(data=request.data)
    
    
    user = request.user

    if serializer.is_valid():
        group = serializer.save(user=user)  
        
        
        if not request.data.get('group_image'):
            # Optionally set a default image path
            group.group_image = 'group_images/default.jpg'  
            group.save()  
        
        return Response(GroupSerializer(group).data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def upload_group_image(request, group_tag):
    group = get_object_or_404(Group, group_tag=group_tag)
    user_id = request.data.get('user_id')
    user = get_object_or_404(User, pk=user_id)
    if group.user != user:
        return Response({'message': 'You are not authorized to change this group image.'}, status=status.HTTP_403_FORBIDDEN)

    new_image = request.FILES.get('group_image')
    
    if not new_image:
        return Response({'message': 'No image file provided.'}, status=status.HTTP_400_BAD_REQUEST)

    group.group_image = new_image
    group.save()

    return Response({'message': 'Group image updated successfully.', 'group_image': group.group_image.url}, status=status.HTTP_200_OK)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def remove_group_image(request, group_tag):
    group = get_object_or_404(Group, group_tag=group_tag)
    user_id = request.data.get('user_id')
    user = get_object_or_404(User, pk=user_id)

    if group.user != user:
        return Response({'message': 'You are not authorized to remove this group image.'}, status=status.HTTP_403_FORBIDDEN)

    group.group_image = 'group_images/default.jpg'
    group.save()

    return Response({'message': 'Group image removed successfully, reverted to default image.', 'group_image': group.group_image.url}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def join_group(request):

    group_tag = request.data.get('group_tag')  
    
    group = get_object_or_404(Group, group_tag=group_tag)
    user = request.user
    group.members.add(user)  
    group.save()  

    return Response({'message': 'Successfully joined the group.'}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_favorite_group(request):
    group_tag = request.data.get('group_tag')
    user = request.user
    group = get_object_or_404(Group, group_tag=group_tag)

    if group.favorites.filter(id=user.id).exists():
        return Response({'message': 'This group is already in your favorites.'}, status=status.HTTP_400_BAD_REQUEST)

    group.favorites.add(user)
    group.save()

    return Response({'message': 'Group added to favorites successfully.'}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_favorite_group(request):
    user_id = request.user.id 
    group_tag = request.data.get('group_tag')

    user = request.user
    group = get_object_or_404(Group, group_tag=group_tag)

    if group.favorites.filter(pk=user_id).exists():
        group.favorites.remove(user)
        return Response({'message': 'Group removed from favorites.'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Group is not in favorites.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_groups(request):
    user = request.user

    favorite_groups = Group.objects.filter(favorites=user)
    created_groups = Group.objects.filter(user=user)
    joined_groups = Group.objects.filter(members=user)

    favorite_groups_data = GroupSerializer(favorite_groups, many=True).data
    created_groups_data = GroupSerializer(created_groups, many=True).data
    joined_groups_data = GroupSerializer(joined_groups, many=True).data

    return Response({
        'favorite_groups': favorite_groups_data,
        'created_groups': created_groups_data,
        'joined_groups': joined_groups_data
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])  
def groups_list(request):
    groups = Group.objects.all()  
    groups_data = GroupSerializer(groups, many=True).data  

    return Response({
        'groups': groups_data
    }, status=status.HTTP_200_OK)

@api_view(['POST'])  
@permission_classes([IsAuthenticated])  
def leave_group(request):
    try:
        group_tag = request.data.get("group_tag")
        group = Group.objects.get(group_tag=group_tag)

       
        if request.user in group.members.all():
            group.members.remove(request.user) 
            return Response({
                'message': f'You have left the group "{group.name}".',
                'group': GroupSerializer(group).data  
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'message': 'You are not a member of this group.'
            }, status=status.HTTP_400_BAD_REQUEST)

    except Group.DoesNotExist:
        return Response({
            'message': 'Group not found.'
        }, status=status.HTTP_404_NOT_FOUND)