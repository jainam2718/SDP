# Django
from django.shortcuts import render

# Rest Framework
from rest_framework import generics, viewsets, views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED
)

# Custom
from .permissions import IsVendor, IsProductOwner
from .models import Products as ProductModel, ProductImage as ProductImageModel
from .serializers import ProductSerializer, ProductImageSerializer, ProductViewSerializer, ProductViewImageSerializer
from Authuser.models import Vendors


class get_all_products(generics.ListCreateAPIView):
    queryset = ProductModel.objects.all()
    serializer_class = ProductViewSerializer
    permission_classes = [IsAuthenticated]


class get_product(generics.RetrieveAPIView):
    queryset = ProductModel.objects.all()
    serializer_class = ProductViewSerializer
    permission_classes = [IsAuthenticated]


class get_all_products_by_catagory(generics.ListCreateAPIView):
    queryset = ProductModel.objects.all()
    serializer_class = ProductViewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # after get all products on DB it will be filtered by its category and return the queryset
        our_queryset = self.queryset.filter(
            catagory=self.request.data["catagory"])
        return our_queryset


class get_all_products_by_vendor(generics.ListCreateAPIView):
    queryset = ProductModel.objects.all()
    serializer_class = ProductViewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # after get all products on DB it will be filtered by its category and return the queryset
        vendor = Vendors.objects.get(pk=self.kwargs['pid'])
        our_queryset = self.queryset.filter(
            vendor=vendor)
        return our_queryset


class Products(viewsets.ModelViewSet):
    queryset = ProductModel.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, IsVendor, ]

    def get_queryset(self):
        # after get all products on DB it will be filtered by its owner and return the queryset
        owner_queryset = self.queryset.filter(vendor=self.request.user.vendors)
        # print(owner_queryset)
        return owner_queryset

    def perform_create(self, serializer):
        # when a product is saved, its saved how it is the owned
        # print(serializer)
        serializer.save(vendor=self.request.user.vendors)
        print(serializer.data)

# class ProductImage(viewsets.ModelViewSet):

#     queryset = ProductImage.objects.all()
#     serializer_class = ProductImageSerializer
#     permission_classes = [IsAuthenticated,IsProductOwner,]

#     def get_queryset(self):
#         # after get all product's images on DB it will be filtered by its related product and return the queryset
#         product = ProductModel.objects.get(pk=self.request.data.get('pid'))
#         owner_queryset = self.queryset.filter(product=product)
#         return owner_queryset

#     def perform_create(self, serializer):
#         # when a product image is saved, its saved how it is the owned
#         product = ProductModel.objects.get(pk=self.request.data.get('pid'))
#         serializer.save(product=product)


class ProductImage(views.APIView):
    permission_classes = [IsAuthenticated, IsProductOwner, ]

    def post(self, request, *args, **kwargs):
        product = ProductModel.objects.get(pk=self.request.data.get('pid'))
        print(product)
        for image in self.request.FILES.getlist('images'):
            product_image = ProductImageSerializer(
                data={'product': product.id, 'image': image})

            if(product_image.is_valid()):
                product_image.save()
            else:
                return Response(product_image.errors, status=HTTP_400_BAD_REQUEST)
        return Response(ProductViewSerializer(product).data, status=HTTP_201_CREATED)


class getProductImage(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # print(kwargs)
        product = ProductModel.objects.get(pk=kwargs['id'])
        print(product)
        image = ProductImageModel.objects.all().filter(product=product)
        product_images = ProductViewImageSerializer(image, many=True)
        print(product_images.data)
        return Response(product_images.data)
