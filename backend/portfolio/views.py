from rest_framework import viewsets, generics
from rest_framework.response import Response
from .models import Profile, Category, Project, ProjectRequest
from .serializers import ProfileSerializer, CategorySerializer, ProjectSerializer, ProjectRequestSerializer
from .utils import get_github_data
from resume.models import Education, Experience, Skill
from resume.serializers import EducationSerializer, ExperienceSerializer, SkillSerializer
from blog.models import BlogPost
from blog.serializers import BlogPostSerializer

class PortfolioViewSet(viewsets.ViewSet):
    def list(self, request):
        profile = Profile.objects.first()
        if not profile:
            return Response({"error": "No profile found"}, status=404)
        
        # Profile Data
        profile_data = ProfileSerializer(profile, context={'request': request}).data
        
        # Resume Data
        education = Education.objects.all()
        experience = Experience.objects.all()
        skills = Skill.objects.all()
        
        resume_data = {
            "education": EducationSerializer(education, many=True).data,
            "experience": ExperienceSerializer(experience, many=True).data,
            "skills": SkillSerializer(skills, many=True).data,
        }
        
        # Portfolio Projects Data
        categories = Category.objects.all()
        projects = Project.objects.all()
        
        portfolio_projects = {
            "categories": ["all"] + [c["name"] for c in CategorySerializer(categories, many=True).data],
            "projects": ProjectSerializer(projects, many=True, context={'request': request}).data
        }

        # Blog Data
        blog_posts = BlogPost.objects.all()
        blog_data = BlogPostSerializer(blog_posts, many=True, context={'request': request}).data

        # GitHub Data
        github_data = get_github_data("anes-bytes")
        
        return Response({
            "profile": profile_data,
            "resume": resume_data,
            "portfolio": portfolio_projects,
            "blog": blog_data,
            "github": github_data
        })

class ProjectRequestView(generics.CreateAPIView):
    queryset = ProjectRequest.objects.all()
    serializer_class = ProjectRequestSerializer
