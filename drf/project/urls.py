"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
from django.urls import path
from django.urls.conf import include
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from apple_users import views


@api_view()
@permission_classes([AllowAny])
def hello_world(request):
    return Response({"message": "Hello, world!"})


urlpatterns = [
    path("admin/", admin.site.urls),
    path("health_check/", hello_world),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("django_prometheus.urls")),
    path("api/", include("drf_github.urls")),
    path("api/", include("djoser.urls")),
    path("api/", include("djoser.urls.authtoken")),
    path("validate_apple_id_token/", views.validate_id_token),
]
