from django.urls import path

from drf_github.views import GithubIssue

urlpatterns = [
    path('new_issue/', GithubIssue.as_view(), name='github-issue'),
]
