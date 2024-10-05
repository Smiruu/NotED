from rest_framework import generics
from user.models import Profile, User  # Ensure User is imported
from .serializers import ListUsersSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from .models import ChatMessage
from django.db.models import Q, Max  # Ensure Q is imported

class ListUsersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        # Fetch all profiles with related user data
        profiles = Profile.objects.select_related('user').all()
        
        # Serialize the data
        serializer = ListUsersSerializer(profiles, many=True)
        
        # Return the serialized data
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UserConversationsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get the current user
        current_user = request.user

        # Get users that the current user has sent or received messages to/from
        user_conversations = ChatMessage.objects.filter(
            Q(sender=current_user) | Q(receiver=current_user)
        ).values('sender_id', 'receiver_id').annotate(last_message_time=Max('timestamp'))  # Annotate with last message time

        # Flatten the result and create a unique list of users with last message time
        unique_users = {}
        for entry in user_conversations:
            sender_id = entry['sender_id']
            receiver_id = entry['receiver_id']
            last_message_time = entry['last_message_time']

            # Determine which user to keep as unique based on ID
            other_user_id = receiver_id if sender_id == current_user.id else sender_id

            # Store the other user and their last message time
            if other_user_id not in unique_users:
                unique_users[other_user_id] = {
                    'last_message_time': last_message_time,
                    'user_id': other_user_id
                }
            else:
                # Update the last message time if it is more recent
                if last_message_time > unique_users[other_user_id]['last_message_time']:
                    unique_users[other_user_id]['last_message_time'] = last_message_time

        # Get user details (e.g., username, photo) using select_related for efficiency
        users = User.objects.filter(id__in=unique_users.keys()).select_related('profile')

        # Prepare user data with sorting by last message time
        user_data = []
        for user in users:
            user_info = {
                'id': user.id,
                'username': user.name,
                'user_tag': user.user_tag,
                'photo': user.profile.photo.url if user.profile.photo else None  # Handle photo URL
            }
            user_info['last_message_time'] = unique_users[user.id]['last_message_time']
            user_data.append(user_info)

        # Sort the user data based on the last message time in descending order
        user_data.sort(key=lambda x: x['last_message_time'], reverse=True)

        return Response({'conversations': user_data}, status=status.HTTP_200_OK)