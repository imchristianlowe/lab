from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from rest_framework import serializers



User = get_user_model()


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups', 'is_staff', 'is_superuser', 'is_active']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
