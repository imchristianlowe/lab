import requests
import json
import jwt
from jwt.algorithms import RSAAlgorithm

encoded_jwt = "eyJraWQiOiJyQlJmVm1xc2puIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLmNocmlzdGlhbmxvd2UuYXBwIiwiZXhwIjoxNzQwNjEwMDg3LCJpYXQiOjE3NDA1MjM2ODcsInN1YiI6IjAwMDI5Ni43NTQyZTJmM2JhODI0MDkwYjdmNTIyNjM4NGE4YWE3YS4xMzQ4IiwiY19oYXNoIjoiWGEzclFFdFhEU25BMTJDVkU2WndOUSIsImVtYWlsIjoia3g0Y21zYnpjdkBwcml2YXRlcmVsYXkuYXBwbGVpZC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNfcHJpdmF0ZV9lbWFpbCI6dHJ1ZSwiYXV0aF90aW1lIjoxNzQwNTIzNjg3LCJub25jZV9zdXBwb3J0ZWQiOnRydWV9.UQkO3ImO3qifFC7R5kYMewdInvz3--kLxmmdvKs94NT8YsAl9DSJirxJH0cdo_krk-rKJzOzhrnLywyhCl2WlXyNInRZL01IfeKRBazjg2TKFN6kQGJbo8oV_qj3Gs2c_XAfq7UNV2ZQ8s4-ycp-_RJ3MTVVbZk5lMaaIQgu6c6ggan6m-dIPadeCVb67FzIEHRcWn9CH0MDsNEhEAjdcsARXNqX7uHl3Cu3SEuZHz75wGxZHPQY1iuRm3L47RaFj1q11fUDGdzvwBsad2MWUuK9Hk6WRoSJMnrcQyzgnY49OQD6dcrrJgrQYWZpgt1dueOLPRc9f5HC8m_q1ADxrA"
apple_jwt_url = "https://appleid.apple.com/auth/keys"
audience = "com.christianlowe.app"

apple_public_keys_response = requests.get(apple_jwt_url)
apple_public_keys_response.raise_for_status()

apple_public_keys = {
    key_info["kid"]: key_info for key_info in apple_public_keys_response.json()["keys"]
}

unverified_header = jwt.get_unverified_header(encoded_jwt)

key_id = unverified_header["kid"]

key = apple_public_keys[key_id]

APPLE_PUBLIC_KEY = RSAAlgorithm.from_jwk(json.dumps(key))

verified_decoded = jwt.decode(
    encoded_jwt, APPLE_PUBLIC_KEY, audience=audience, algorithms=[key["alg"]]
)
print(json.dumps(verified_decoded, indent=2))
