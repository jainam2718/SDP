from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CartDetails, Orders
from .views import charge
router = DefaultRouter()
router.register(r'cart', CartDetails)
router.register(r'orders', Orders)
# router.register(r'productimage', ProductImage)

urlpatterns = [
    path('', include(router.urls)),
    path('pay', charge, name="pay"),
]
