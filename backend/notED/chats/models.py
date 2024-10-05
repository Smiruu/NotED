from django.db import models
from channels.db import database_sync_to_async
from user.models import User, Profile

class ChatMessage(models.Model):
    sender = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE)
    message = models.TextField()  # Field to store the message content
    timestamp = models.DateTimeField(auto_now_add=True)  # Automatically set the time of message creation

    class Meta:
        ordering = ['timestamp']  # Order messages by timestamp in ascending order

    def __str__(self):
        return f"{self.sender} to {self.receiver} at {self.timestamp}: {self.message[:20]}..."  # Show first 20 chars of the message

    def get_sender_photo(self):
        """Return the profile photo of the sender."""
        return self.get_user_photo(self.sender)

    def get_receiver_photo(self):
        """Return the profile photo of the receiver."""
        return self.get_user_photo(self.receiver)

    def get_user_photo(self, user):
        """Helper method to return the profile photo of the given user."""
        try:
            profile = Profile.objects.get(user=user)
            return profile.photo.url if profile.photo else None  # Return photo URL if exists
        except Profile.DoesNotExist:
            return None