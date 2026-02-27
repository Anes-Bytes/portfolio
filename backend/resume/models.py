from django.db import models

class Education(models.Model):
    title = models.CharField(max_length=200)
    period = models.CharField(max_length=100)
    description = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name_plural = "Education"

    def __str__(self):
        return self.title

class Experience(models.Model):
    title = models.CharField(max_length=200)
    period = models.CharField(max_length=100)
    description = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name_plural = "Experience"

    def __str__(self):
        return self.title

class Skill(models.Model):
    name = models.CharField(max_length=100)
    level = models.PositiveIntegerField(help_text="Percentage (0-100)")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name
