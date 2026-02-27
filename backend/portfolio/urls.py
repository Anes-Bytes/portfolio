from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PortfolioViewSet, ProjectRequestView
from blog.views import BlogPostViewSet

router = DefaultRouter()
router.register(r'portfolio', PortfolioViewSet, basename='portfolio')
router.register(r'blog', BlogPostViewSet, basename='blog')

urlpatterns = [
    path('', include(router.urls)),
    path('project-request/', ProjectRequestView.as_view(), name='project-request'),
]
