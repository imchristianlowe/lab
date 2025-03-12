from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from apple_users.authentication import AppleIdTokenAuthentication


# Create your views here.
@api_view(['GET'])
@authentication_classes([AppleIdTokenAuthentication])
@permission_classes([IsAuthenticated])
def validate_id_token(request):


    return Response({"message": "Hello, world!", "user_id": request.user.id})
