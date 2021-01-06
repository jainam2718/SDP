from django.contrib import admin
from django.urls import path, include
import epicbox
from Authuser import views
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'address', views.AddressViewSet)

urlpatterns = [
    path('customer/register', views.customer_registration_view,
         name="customer_register"),
    path('signin', views.signin_view, name="signin"),
    path('vendor/register', views.vendor_registration_view, name="vendor_register"),
    path('logout', views.logout, name="logout"),
    #path('customer/update', views.customer_update_view, name="customer_update"),
    path('vendor/update', views.vendor_update_view, name="vendor_update"),
    path('', include(router.urls)),
]
