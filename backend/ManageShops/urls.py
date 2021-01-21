from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import Products,get_all_products,get_all_products_by_catagory,ProductImage

router = DefaultRouter()
router.register(r'products', Products)
router.register(r'productimage', ProductImage)

urlpatterns = [
    path('', include(router.urls)),
    path('products/all', get_all_products.as_view(), name="get_all_products"),
    path('products/all/by_catagory', get_all_products_by_catagory.as_view(), name="get_all_products_by_catagory"),
]