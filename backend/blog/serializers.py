from rest_framework import serializers
from .models import BlogPost, BlogCategory, Tag

class BlogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = ['name', 'slug']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name', 'slug']

class BlogPostSerializer(serializers.ModelSerializer):
    category = BlogCategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    language_label = serializers.SerializerMethodField()

    def get_language_label(self, obj):
        return '\u0641\u0627\u0631\u0633\u06cc' if obj.language == 'fa' else 'English'
    
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'image', 'content', 'short_description',
            'language', 'language_label', 'category', 'tags',
            'created_at', 'updated_at'
        ]
