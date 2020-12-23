from django.contrib import admin
from django.urls import path, include
import epicbox
from Authuser.views import customer_registration_view, vendor_registration_view, AddressList, AddressDetail
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter


urlpatterns = [
    path('customer/register', customer_registration_view, name="customer_register"),
    path('login', obtain_auth_token, name="login"),
    path('vendor/register', vendor_registration_view, name="vendor_register"),
    path('address/', AddressList.as_view()),
    path('address/<int:pk>/', AddressDetail.as_view()),
]
