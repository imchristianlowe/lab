from rest_framework import serializers


class GithubIssueSerializer(serializers.Serializer):
    title: str = serializers.CharField(required=True)
    body: str = serializers.CharField(required=False)
    label: str = serializers.ChoiceField(
        choices=(
            ("bug", "bug"),
            ("enhancement", "feature request"),
            ("ui improvement", "ui improvement"),
        ),
        required=True,
    )
