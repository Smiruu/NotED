from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<group_tag>[a-zA-Z0-9_-]+)/$', consumers.GroupChatConsumer.as_asgi()),
]
