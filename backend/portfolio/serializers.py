from rest_framework import serializers
from .models import Profile, Service, Category, Project, ProjectRequest

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'icon', 'title', 'description', 'order']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class ProjectSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    tech = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'category', 'category_name', 'image', 'description',
            'tech_stack', 'tech', 'live_url', 'github_url', 'order'
        ]

    def get_tech(self, obj):
        return [t.strip() for t in obj.tech_stack.split(',')]

class ProfileSerializer(serializers.ModelSerializer):
    services = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            'id', 'name', 'title', 'email', 'phone', 'avatar', 'birthday',
            'location', 'github', 'telegram', 'linkedin', 'about_me', 'services'
        ]

    def get_services(self, obj):
        services = Service.objects.all()
        return ServiceSerializer(services, many=True).data

class ProjectRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectRequest
        fields = ['id', 'full_name', 'project_title', 'description', 'contact_info', 'created_at']
        read_only_fields = ['created_at']
