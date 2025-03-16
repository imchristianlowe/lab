import logging
import time

import jwt
import requests
from django.conf import settings
from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.views import APIView

from drf_github.serializers import GithubIssueSerializer

logger = logging.getLogger(__name__)


def get_github_app_jwt(seconds_until_expiry: int = 10) -> str:
    payload = {
        # Issued at time
        "iat": int(time.time()),
        # JWT expiration time (10 minutes maximum)
        "exp": int(time.time()) + seconds_until_expiry,
        # GitHub App's client ID
        "iss": settings.GITHUB_APP["CLIENT_ID"],
    }
    encoded_jwt = jwt.encode(
        payload, settings.GITHUB_APP["APP_SECRET"], algorithm="RS256"
    )
    return encoded_jwt


def get_github_app_token(
    installation_id: str = settings.GITHUB_APP.get("APP_INSTALLATION_ID"),
) -> str:
    # TODO: Add caching
    gh_jwt = get_github_app_jwt()
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {gh_jwt}",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    response = requests.post(
        f"https://api.github.com/app/installations/{installation_id}/access_tokens",
        headers=headers,
    )
    response.raise_for_status()
    return response.json()["token"]


# Create your views here.
class GithubIssue(APIView):
    """
    View to list all users in the system.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """

    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        """
        Create a new GitHub issue.
        """
        logger.info("Creating new GitHub issue")
        gh_token = get_github_app_token()
        headers = {
            "Accept": "application/vnd.github+json",
            "Authorization": f"Bearer {gh_token}",
            "X-GitHub-Api-Version": "2022-11-28",
        }
        serializer = GithubIssueSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        payload = {
            "title": serializer.data["title"],
            "body": serializer.data.get("body", None),
            "labels": [serializer.data["label"]],
        }
        response = requests.post(
            url=f"https://api.github.com/repos/{settings.GITHUB_APP['REPO_OWNER']}/{settings.GITHUB_APP['REPO']}/issues",
            headers=headers,
            json=payload,
        )
        return JsonResponse(response.json())
