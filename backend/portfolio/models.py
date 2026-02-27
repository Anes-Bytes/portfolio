from django.db import models

class Profile(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    avatar = models.ImageField(upload_to='profile/')
    birthday = models.DateField()
    location = models.CharField(max_length=255)
    github = models.URLField(blank=True, null=True)
    telegram = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    about_me = models.TextField()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Profile"

class Service(models.Model):
    ICON_CHOICES = [
        ('Code', 'Code'),
        ('Zap', 'Zap'),
        ('Smartphone', 'Smartphone'),
        ('PenTool', 'PenTool'),
    ]
    icon = models.CharField(max_length=50, choices=ICON_CHOICES)
    title = models.CharField(max_length=100)
    description = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, allow_unicode=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Project(models.Model):
    title = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='projects')
    image = models.ImageField(upload_to='projects/')
    description = models.TextField()
    tech_stack = models.CharField(max_length=255, help_text="Comma separated tags e.g. React, Node.js")
    live_url = models.URLField(blank=True, null=True, verbose_name="Visit Link")
    github_url = models.URLField(blank=True, null=True, verbose_name="Preview/GitHub Link")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title

class ProjectRequest(models.Model):
    full_name = models.CharField(max_length=100)
    project_title = models.CharField(max_length=200)
    description = models.TextField()
    contact_info = models.CharField(max_length=255, help_text="Email, Telegram ID, or Phone")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.project_title} - {self.full_name}"
