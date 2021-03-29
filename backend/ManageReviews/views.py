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
from .permissions import IsReviewOwner
from .models import Reviews as ReviewsModel
from .serializers import ReviewsSerializer, ReviewsViewSerializer
from ManageShops.serializers import ProductSerializer
from ManageShops.models import Products


class Reviews(viewsets.ModelViewSet):

    queryset = ReviewsModel.objects.all()
    serializer_class = ReviewsSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'list':
            return ReviewsViewSerializer
        if self.action == 'retrieve':
            return ReviewsViewSerializer
        return ReviewsSerializer

    def get_queryset(self):
        product = Products.objects.get(pk=self.kwargs['pid'])
        owner_queryset = self.queryset.filter(product=product)
        return owner_queryset

    def perform_create(self, serializer):
        product = Products.objects.get(pk=self.request.data['pid'])
        serializer.save(user=self.request.user, product=product)


class DeleteReviews(viewsets.ModelViewSet):

    queryset = ReviewsModel.objects.all()
    serializer_class = ReviewsSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'list':
            return ReviewsViewSerializer
        if self.action == 'retrieve':
            return ReviewsViewSerializer
        return ReviewsSerializer
