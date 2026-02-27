from django.contrib import admin
from modeltranslation.admin import TranslationAdmin
from .models import Education, Experience, Skill

@admin.register(Education)
class EducationAdmin(TranslationAdmin):
    list_display = ('title_en', 'title_fa', 'period_en', 'order')
    list_editable = ('order',)

@admin.register(Experience)
class ExperienceAdmin(TranslationAdmin):
    list_display = ('title_en', 'title_fa', 'period_en', 'order')
    list_editable = ('order',)

@admin.register(Skill)
class SkillAdmin(TranslationAdmin):
    list_display = ('name_en', 'name_fa', 'level', 'order')
    list_editable = ('level', 'order')
