from modeltranslation.translator import register, TranslationOptions
from .models import BlogCategory, Tag

@register(BlogCategory)
class BlogCategoryTranslationOptions(TranslationOptions):
    fields = ('name',)

@register(Tag)
class TagTranslationOptions(TranslationOptions):
    fields = ('name',)
