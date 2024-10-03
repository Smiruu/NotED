from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import ToDoList
from .serializers import ToDoListSerializer
from django.shortcuts import get_object_or_404

# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_to_do_list(request):
    user = request.user
    to_do_list = ToDoList.objects.filter(user=user)
    
    return Response(ToDoListSerializer(to_do_list, many=True).data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_to_do_list(request):
    user = request.user
    serializer = ToDoListSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(user=user)  # Save the todo list with the user
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_to_do_list(request, _id):  # Changed parameter name to `_id`
    user = request.user
    to_do_list = get_object_or_404(ToDoList, pk=_id, user=user)  # Updated to use `_id`

    # Update fields based on request data
    if 'title' in request.data:
        to_do_list.title = request.data['title']
    if 'completed' in request.data:
        to_do_list.completed = request.data['completed']

    to_do_list.save()

    return Response(ToDoListSerializer(to_do_list).data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_to_do_list(request, _id):  # Changed parameter name to `_id`
    user = request.user
    to_do_list = get_object_or_404(ToDoList, pk=_id, user=user)  # Updated to use `_id`

    # Check if the to_do_list is completed
    if to_do_list.completed:
        to_do_list.delete()
        return Response({"message": "To Do list deleted because it's completed."}, status=status.HTTP_204_NO_CONTENT)
    else:
        return Response({"error": "To Do list is not completed, cannot be deleted."}, status=status.HTTP_400_BAD_REQUEST)
