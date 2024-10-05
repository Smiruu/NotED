from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import ChatMessage, Group
from rest_framework_simplejwt.authentication import JWTAuthentication
import json

class GroupChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_tag = self.scope['url_route']['kwargs']['group_tag']
        self.group_name = f'chat_{self.group_tag}'

        # Extract the token from the query string
        token = self.scope['query_string'].decode('utf8').split('token=')[-1]

        # Authenticate the user
        user = await self.get_user_from_token(token)
        if user is not None:
            self.user = user

            # Retrieve the group instance
            self.group = await self.get_group_instance(self.group_tag)

            if self.group:
                # Join group
                await self.channel_layer.group_add(self.group_name, self.channel_name)

                # Accept the connection
                await self.accept()

                # Retrieve chat history
                messages = await self.get_chat_history()
                await self.send(text_data=json.dumps({'messages': messages}))
            else:
                await self.close()  # Close the connection if group not found
        else:
            await self.close()  # Close the connection if authentication fails

    @database_sync_to_async
    def get_user_from_token(self, token):
        try:
            validated_token = JWTAuthentication().get_validated_token(token)
            user = JWTAuthentication().get_user(validated_token)
            return user
        except Exception as e:
            print(f"Token authentication failed: {e}")
            return None

    @database_sync_to_async
    def get_group_instance(self, group_tag):
        try:
            return Group.objects.get(group_tag=group_tag)
        except Group.DoesNotExist:
            return None

    @database_sync_to_async
    def get_chat_history(self):
        chat_messages = ChatMessage.objects.filter(group=self.group).order_by('timestamp')
        return [
        {
            'user': message.user.name,
            'content': message.content,
            'photo': message.get_user_photo()  # Include the user's photo URL
        }
        for message in chat_messages
        ]

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Save the message to the database
        chat_message = await self.save_message(message)

        # Retrieve the user's photo URL asynchronously
        photo_url = await self.get_user_photo(chat_message)

        # Send message to group
        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': 'chat_message',
                'message': chat_message.content,
                'user': chat_message.user.name,
                'photo': photo_url  # Use the retrieved photo URL
            }
        )

    @database_sync_to_async
    def get_user_photo(self, chat_message):
        # Fetch the user's photo in a synchronous context
        return chat_message.get_user_photo()

    @database_sync_to_async
    def save_message(self, message):
        # Use self.group to save the message
        chat_message = ChatMessage.objects.create(group=self.group, user=self.user, content=message)
        return chat_message

    async def chat_message(self, event):
        message = event['message']
        user = event['user']
        photo = event.get('photo', None)  # Retrieve the photo from the event

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'user': user,
            'photo': photo  # Include the photo URL in the response
        }))