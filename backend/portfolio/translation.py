from modeltranslation.translator import register, TranslationOptions
from .models import Profile, Service, Category, Project

@register(Profile)
class ProfileTranslationOptions(TranslationOptions):
    fields = ('name', 'title', 'location', 'about_me')

@register(Service)
class ServiceTranslationOptions(TranslationOptions):
    fields = ('title', 'description')

@register(Category)
class CategoryTranslationOptions(TranslationOptions):
    fields = ('name',)

@register(Project)
class ProjectTranslationOptions(TranslationOptions):
    fields = ('title', 'description')
