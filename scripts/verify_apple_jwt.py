import requests
import json
import jwt
from jwt.algorithms import RSAAlgorithm

encoded_jwt = "changeme"
apple_jwt_url = "https://appleid.apple.com/auth/keys"
audience = "com.christianlowe.app"

apple_public_keys_response = requests.get(apple_jwt_url)
apple_public_keys_response.raise_for_status()

apple_public_keys = {key_info["kid"]: key_info for key_info in apple_public_keys_response.json()["keys"]}

unverified_header = jwt.get_unverified_header(encoded_jwt)

key_id = unverified_header["kid"]

key = apple_public_keys[key_id]

APPLE_PUBLIC_KEY = RSAAlgorithm.from_jwk(json.dumps(key))

verified_decoded = jwt.decode(encoded_jwt, APPLE_PUBLIC_KEY, audience=audience, algorithms=[key["alg"]])
print(json.dumps(verified_decoded, indent=2))
