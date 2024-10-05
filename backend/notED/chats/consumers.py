from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import ChatMessage, User
import json
from rest_framework_simplejwt.authentication import JWTAuthentication
class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.sender_tag = self.scope['url_route']['kwargs']['sender_tag']
        self.receiver_tag = self.scope['url_route']['kwargs']['receiver_tag']
        self.room_name = self.get_room_name(self.sender_tag, self.receiver_tag)

        # Extract the token from the query string
        token = self.scope['query_string'].decode('utf8').split('token=')[-1]

        # Authenticate the user
        self.user = await self.get_user_from_token(token)
        if self.user is not None:
            # Join the chat room
            await self.channel_layer.group_add(self.room_name, self.channel_name)
            await self.accept()

            # Retrieve chat history
            messages = await self.get_chat_history(self.sender_tag, self.receiver_tag)
            await self.send(text_data=json.dumps({'messages': messages}))
        else:
            await self.close()  # Close the connection if authentication fails

    def get_room_name(self, sender_tag, receiver_tag):
        return f'chat_{min(sender_tag, receiver_tag)}_{max(sender_tag, receiver_tag)}'

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
    def get_chat_history(self, sender_tag, receiver_tag):
        chat_messages = ChatMessage.objects.filter(
            sender__user_tag=sender_tag, receiver__user_tag=receiver_tag
        ) | ChatMessage.objects.filter(
            sender__user_tag=receiver_tag, receiver__user_tag=sender_tag
        ).order_by('timestamp')

        messages = []
        for message in chat_messages:
            # Await the photo retrieval
            photo = message.get_user_photo(message.sender)  # Make this synchronous call
            messages.append({
                'user': message.sender.name,
                'content': message.message,
                'photo': photo
            })

        return messages

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json.get('message')

        # Save the message to the database
        chat_message = await self.save_message(message, self.sender_tag, self.receiver_tag)
        photo_url = await self.get_user_photo(chat_message) 

        # Send message to the group
        await self.channel_layer.group_send(
            self.room_name,
            {
                'type': 'chat_message',
                'message': chat_message.message,
                'user': chat_message.sender.name,
                'photo': photo_url 
            }
        )
    @database_sync_to_async
    def get_user_photo(self, chat_message):
        # Fetch the user's photo in a synchronous context
        return chat_message.get_sender_photo()
    
    @database_sync_to_async
    def save_message(self, message, sender_tag, receiver_tag):
        sender = User.objects.get(user_tag=sender_tag)
        receiver = User.objects.get(user_tag=receiver_tag)
        chat_message = ChatMessage.objects.create(sender=sender, receiver=receiver, message=message)
        return chat_message

    async def chat_message(self, event):
        message = event['message']
        user = event['user']
        photo = event.get('photo', None)

        await self.send(text_data=json.dumps({
            'message': message,
            'user': user,
            'photo': photo
        }))
