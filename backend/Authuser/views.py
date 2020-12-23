from django.shortcuts import render
from rest_framework import status, generics, viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from Authuser.serializers import UserSerializer, VendorSerializer, AddressSerializer
from rest_framework.authtoken.models import Token
from rest_framework import serializers
from Authuser.models import Vendors, Customers, User, Address
import json
from Authuser.permissions import IsOwner
import logging

# Create your views here.


@api_view(['POST', ])
def customer_registration_view(request):
    if request.data['is_vendor']:
        raise serializers.ValidationError(
            {'error': 'Customer cannot be Vendor'})
    serializer = UserSerializer(data=request.data)
    if User.objects.filter(email=request.data['email']).exists():
        raise serializers.ValidationError({'user': 'User already Exist'})
    data = {}
    if serializer.is_valid():
        user = serializer.save()
        customer = Customers(
            user=user,
            is_special=False
        )
        customer.save()
        data['response'] = "Succesfully registered Customer"
        data['username'] = user.username
        data['email'] = user.email
        token = Token.objects.get(user=user).key
        data['token'] = token
    else:
        data = serializer.errors
    return Response(data)


@api_view(['POST', ])
def vendor_registration_view(request):
    serializer = UserSerializer(data=request.data)
    serializer1 = VendorSerializer(data=request.data)
    if User.objects.filter(email=request.data['email']).exists():
        raise serializers.ValidationError({'error': 'User already Exist'})
    data = {}
    if serializer.is_valid():
        if serializer1.is_valid():
            user = serializer.save()
            vendor = serializer1.save()
            vendor.user = user
            vendor.save()
            data['response'] = "Succesfully registered Vendor"
            data['shop_name'] = vendor.shop_name
            data['username'] = user.username
            data['email'] = user.email
            token = Token.objects.get(user=user).key
            data['token'] = token
        else:
            data = serializer1.errors
    else:
        data = serializer.errors
    return Response(data)


class AddressDetail(APIView):

    def get_object(self, pk):
        try:
            address = Address.objects.get(pk=pk)
            if address.user == request.user:
                return address
            else:
                return None
        except Snippet.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        address = self.get_object(pk)
        if address != None:
            serializer = AddressSerializer(address)
        else:
            return Response({'error': 'Bad Request'}, 400)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        address = self.get_object(pk)
        serializer = AddressSerializer(address, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        address = self.get_object(pk)
        address.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AddressList(APIView):
    """
    List all snippets, or create a new snippet.
    """

    def get(self, request, format=None):
        address = Address.objects.all()
        serializer = AddressSerializer(address, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = AddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
