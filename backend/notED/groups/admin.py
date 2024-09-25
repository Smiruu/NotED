from django.contrib import admin
from .models import Group  # Import your Group model

@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = ('name', 'group_tag', 'user')  # Fields to display in the admin list view
    search_fields = ('name', 'group_tag')  # Fields to search in the admin
    list_filter = ('user',)  # Filter options in the admin

    def get_queryset(self, request):
        # Customize queryset if needed, for example to show related users
        return super().get_queryset(request).select_related('user')

# If you have other models, you can register them here as well
