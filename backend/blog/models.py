from django.db import models

class BlogCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, allow_unicode=True)

    class Meta:
        verbose_name_plural = "Blog Categories"

    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(unique=True, allow_unicode=True)

    def __str__(self):
        return self.name

class BlogPost(models.Model):
    LANGUAGE_EN = 'en'
    LANGUAGE_FA = 'fa'
    LANGUAGE_CHOICES = (
        (LANGUAGE_EN, 'English'),
        (LANGUAGE_FA, 'Persian'),
    )

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, allow_unicode=True)
    image = models.ImageField(upload_to='blog/')
    language = models.CharField(max_length=2, choices=LANGUAGE_CHOICES, default=LANGUAGE_EN)
    content = models.TextField()
    short_description = models.TextField()
    category = models.ForeignKey(BlogCategory, on_delete=models.SET_NULL, null=True, related_name='posts')
    tags = models.ManyToManyField(Tag, related_name='posts')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
