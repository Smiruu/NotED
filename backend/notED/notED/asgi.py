"""
ASGI config for notED project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from groups import routing as groups_routing  # Import the routing from groups
from chats import routing as chats_routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'notED.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            # Combine the WebSocket URL patterns from both routing files
            groups_routing.websocket_urlpatterns + chats_routing.websocket_urlpatterns
        )
    ),
})