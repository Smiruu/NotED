from django.urls import path
from .consumers import ChatConsumer

# Define the WebSocket URL routing
websocket_urlpatterns = [
    path('ws/chat/<str:sender_tag>/<str:receiver_tag>/', ChatConsumer.as_asgi()),
]
