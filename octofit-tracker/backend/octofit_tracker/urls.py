"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from octofit_tracker import views
import os


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'teams', views.TeamViewSet)
router.register(r'activities', views.ActivityViewSet)
router.register(r'workouts', views.WorkoutViewSet)
router.register(r'leaderboards', views.LeaderboardViewSet)

CODESPACE_NAME = os.environ.get('CODESPACE_NAME', '')
# Construct both HTTPS and HTTP base URLs for Codespaces. Return both in the API
# root so clients can choose the insecure HTTP fallback to avoid certificate
# verification issues during quick development testing.
if CODESPACE_NAME:
    base_url_https = f"https://{CODESPACE_NAME}-8000.app.github.dev"
    base_url_http = f"http://{CODESPACE_NAME}-8000.app.github.dev"
else:
    base_url_https = "http://localhost:8000"
    base_url_http = "http://localhost:8000"

from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def api_root(request, format=None):
    # Provide both secure and insecure URLs so callers can opt into the HTTP
    # fallback when testing without validating Codespaces TLS certificates.
    return Response({
        'users': {
            'secure': f'{base_url_https}/api/users/',
            'insecure': f'{base_url_http}/api/users/',
        },
        'teams': {
            'secure': f'{base_url_https}/api/teams/',
            'insecure': f'{base_url_http}/api/teams/',
        },
        'activities': {
            'secure': f'{base_url_https}/api/activities/',
            'insecure': f'{base_url_http}/api/activities/',
        },
        'workouts': {
            'secure': f'{base_url_https}/api/workouts/',
            'insecure': f'{base_url_http}/api/workouts/',
        },
        'leaderboards': {
            'secure': f'{base_url_https}/api/leaderboards/',
            'insecure': f'{base_url_http}/api/leaderboards/',
        },
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', api_root, name='api_root'),
]
