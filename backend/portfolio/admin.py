from django.contrib import admin
from modeltranslation.admin import TranslationAdmin
from .models import Profile, Service, Category, Project, ProjectRequest

@admin.register(Profile)
class ProfileAdmin(TranslationAdmin):
    list_display = ('name_en', 'name_fa', 'title_en', 'email')
    
    def has_add_permission(self, request):
        # Allow only one profile
        if self.model.objects.count() >= 1:
            return False
        return super().has_add_permission(request)

@admin.register(Service)
class ServiceAdmin(TranslationAdmin):
    list_display = ('title_en', 'title_fa', 'icon', 'order')
    list_editable = ('order',)

@admin.register(Category)
class CategoryAdmin(TranslationAdmin):
    list_display = ('name_en', 'name_fa', 'slug')
    prepopulated_fields = {'slug': ('name_en',)}

@admin.register(Project)
class ProjectAdmin(TranslationAdmin):
    list_display = ('title_en', 'title_fa', 'category', 'order')
    list_editable = ('order',)
    list_filter = ('category',)

@admin.register(ProjectRequest)
class ProjectRequestAdmin(admin.ModelAdmin):
    list_display = ('project_title', 'full_name', 'contact_info', 'created_at')
    readonly_fields = ('created_at',)
    search_fields = ('project_title', 'full_name', 'contact_info')
