# Django
from django.shortcuts import render

# Rest Framework
from rest_framework import generics, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK,
    HTTP_204_NO_CONTENT
)

# Custom
from .permissions import IsVendor,IsProductOwner
from .models import Products as ProductModel, ProductImage
from .serializers import ProductSerializer,ProductImageSerializer




class get_all_products(generics.ListCreateAPIView):
    queryset = ProductModel.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]


class get_all_products_by_catagory(generics.ListCreateAPIView):
    queryset = ProductModel.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # after get all products on DB it will be filtered by its category and return the queryset
        our_queryset = self.queryset.filter(catagory=self.request.data["catagory"])
        return our_queryset



class Products(viewsets.ModelViewSet):
    queryset = ProductModel.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated,IsVendor,]

    def get_queryset(self):
        # after get all products on DB it will be filtered by its owner and return the queryset
        owner_queryset = self.queryset.filter(vendor=self.request.user.vendors)
        return owner_queryset

    def perform_create(self, serializer):
        # when a product is saved, its saved how it is the owned
        serializer.save(vendor=self.request.user.vendors)



class ProductImage(viewsets.ModelViewSet):

    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    permission_classes = [IsAuthenticated,IsProductOwner,]

    def get_queryset(self):
        # after get all product's images on DB it will be filtered by its related product and return the queryset
        product = ProductModel.objects.get(pk=self.request.data.get('pid'))
        owner_queryset = self.queryset.filter(product=product)
        return owner_queryset

    def perform_create(self, serializer):
        # when a product image is saved, its saved how it is the owned
        product = ProductModel.objects.get(pk=self.request.data.get('pid'))
        serializer.save(product=product)