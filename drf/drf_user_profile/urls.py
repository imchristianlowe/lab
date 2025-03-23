from rest_framework.routers import DefaultRouter

from drf_user_profile import views

router = DefaultRouter()

router.register(r"users", views.UserViewSet)

urlpatterns = [] + router.urls
