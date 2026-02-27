from modeltranslation.translator import register, TranslationOptions
from .models import Education, Experience, Skill

@register(Education)
class EducationTranslationOptions(TranslationOptions):
    fields = ('title', 'period', 'description')

@register(Experience)
class ExperienceTranslationOptions(TranslationOptions):
    fields = ('title', 'period', 'description')

@register(Skill)
class SkillTranslationOptions(TranslationOptions):
    fields = ('name',)
