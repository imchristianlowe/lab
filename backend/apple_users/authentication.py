import json
import logging
import time
from dataclasses import dataclass

from django.contrib.auth import get_user_model
from rest_framework import authentication
from rest_framework import exceptions
import jwt
from jwt.algorithms import RSAAlgorithm

from django.conf import settings
from django.db import transaction

from apple_users.models import AppleUserInfo

logger = logging.getLogger(__name__)

User = get_user_model()


@dataclass
class AppleIdToken:
    iss: str
    sub: str
    aud: str
    iat: int
    exp: int
    nonce_supported: bool
    email: str
    email_verified: bool
    is_private_email: bool

    transfer_sub: str | None = None
    real_user_status: int | None = None
    nonce: str | None = None
    c_hash: str | None = None
    auth_time: int | None = None


class AppleIdTokenAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        id_token = request.META.get('HTTP_X_APPLE_ID_TOKEN')

        if not id_token:
            return None

        unverified_header = jwt.get_unverified_header(id_token)

        key_id = unverified_header["kid"]

        key = settings.APPLE_PUBLIC_KEYS[key_id]

        apple_public_key = RSAAlgorithm.from_jwk(json.dumps(key))

        verified_decoded = jwt.decode(id_token, apple_public_key, audience=settings.APPLE_APP_AUDIENCE, algorithms=[key["alg"]])

        apple_id_token = AppleIdToken(**verified_decoded)

        try:
            logger.debug(f"Attempting to find Apple User with {apple_id_token.sub}")
            apple_user_info = AppleUserInfo.objects.get(sub=apple_id_token.sub)
            user = apple_user_info.user
        except User.DoesNotExist:
            logger.debug(f"Did not find user with Apple sub as {apple_id_token.sub}. Creating")

            with transaction.atomic():
                user = User(username=apple_id_token.sub, email=apple_id_token.email)
                user.save()

                apple_user_info = AppleUserInfo(user=user, sub=apple_id_token.sub)
                apple_user_info.save()

        return (user, None)
