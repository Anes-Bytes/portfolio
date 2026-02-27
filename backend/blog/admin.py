from django.contrib import admin
from django import forms
from modeltranslation.admin import TranslationAdmin
from .models import BlogPost, BlogCategory, Tag

try:
    from tinymce.widgets import TinyMCE
except ModuleNotFoundError:
    TinyMCE = None

@admin.register(BlogCategory)
class BlogCategoryAdmin(TranslationAdmin):
    list_display = ('name_en', 'name_fa', 'slug')
    prepopulated_fields = {'slug': ('name_en',)}

@admin.register(Tag)
class TagAdmin(TranslationAdmin):
    list_display = ('name_en', 'name_fa', 'slug')
    prepopulated_fields = {'slug': ('name_en',)}

class BlogPostAdminForm(forms.ModelForm):
    class Meta:
        model = BlogPost
        fields = '__all__'
        widgets = (
            {
                'content': TinyMCE(
                    attrs={'cols': 100, 'rows': 25},
                    mce_attrs={
                        'height': 500,
                        'menubar': True,
                        'plugins': (
                            'advlist autolink lists link image charmap preview anchor '
                            'searchreplace visualblocks code fullscreen insertdatetime media '
                            'table code help wordcount'
                        ),
                        'toolbar': (
                            'undo redo | blocks | bold italic underline strikethrough | '
                            'forecolor backcolor | alignleft aligncenter alignright alignjustify | '
                            'bullist numlist outdent indent | removeformat | code | help'
                        ),
                    },
                ),
                'short_description': TinyMCE(
                    attrs={'cols': 100, 'rows': 8},
                    mce_attrs={
                        'height': 220,
                        'menubar': False,
                        'plugins': 'link lists code',
                        'toolbar': 'undo redo | bold italic underline | bullist numlist | link | code',
                    },
                ),
            }
            if TinyMCE
            else {
                'content': forms.Textarea(attrs={'rows': 20}),
                'short_description': forms.Textarea(attrs={'rows': 6}),
            }
        )

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    form = BlogPostAdminForm
    list_display = ('title', 'language', 'category', 'created_at')
    list_filter = ('language', 'category', 'created_at')
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('tags',)
    search_fields = ('title', 'short_description', 'content')
