from django.urls import path
from django.http import HttpResponseRedirect
from . import views

from .auth_views import (
    csrf_cookie,
    StudentSignupView,
    StudentLoginView,
    StudentProfileView,
    StudentLogoutView,
    PasswordResetRequestView,
    PasswordResetConfirmView,
)


def password_reset_confirm_redirect(request, uidb64, token):
    return HttpResponseRedirect(
        f"http://localhost:5173/reset-password/{uidb64}/{token}/"
    )


urlpatterns = [
    path("health/", views.health, name="health"),
    path("subjects/", views.SubjectList.as_view(), name="subjects"),
    path("subjects/<int:pk>/", views.SubjectDetail.as_view(), name="subject-detail"),
    path("topics/", views.TopicList.as_view(), name="topics"),
    path("questions/", views.QuestionList.as_view(), name="questions"),
    path("reviews/", views.ReviewListCreate.as_view(), name="reviews"),
    path("past-papers/", views.PastPaperList.as_view(), name="past-papers"),
    path("payments/initiate/", views.initiate_payment, name="payment-initiate"),
    path("payments/verify/", views.verify_payment, name="payment-verify"),
    path("auth/csrf/", csrf_cookie, name="student-csrf"),
    path("auth/signup/", StudentSignupView.as_view(), name="student-signup"),
    path("auth/login/", StudentLoginView.as_view(), name="student-login"),
    path("auth/profile/", StudentProfileView.as_view(), name="student-profile"),
    path("auth/logout/", StudentLogoutView.as_view(), name="student-logout"),
    path(
        "auth/password-reset/request/",
        PasswordResetRequestView.as_view(),
        name="password-reset-request",
    ),
    path(
        "auth/password-reset/confirm/",
        PasswordResetConfirmView.as_view(),
        name="password-reset-confirm",
    ),
    path(
        "password-reset/<uidb64>/<token>/",
        password_reset_confirm_redirect,
        name="password_reset_confirm",
    ),
]
