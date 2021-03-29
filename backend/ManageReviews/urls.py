from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import Reviews, DeleteReviews

router = DefaultRouter()
router.register(r'reviews/(?P<pid>\d+)', Reviews)
router.register(r'reviews', Reviews)
router.register(r'deletereviews', DeleteReviews)
# router.register(r'productimage', ProductImage)

urlpatterns = [
    path('', include(router.urls)),
]