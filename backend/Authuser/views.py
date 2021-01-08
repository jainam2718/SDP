# Django
from django.core.mail import send_mail
from django_rest_passwordreset.signals import reset_password_token_created
from django.urls import reverse
from django.dispatch import receiver
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate

# Rest Framework
from rest_framework import status, generics, viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK,
)

# Custom
from Authuser.serializers import UserSerializer, VendorSerializer, AddressSerializer, ChangePasswordSerializer
from Authuser.models import Vendors, Customers, User, Address
from Authuser.permissions import IsOwner
from Authuser.authentication import expires_in, is_token_expired, token_expire_handler, ExpiringTokenAuthentication
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
            vendor = serializer1.save(user=user)
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


@api_view(['POST', ])
@permission_classes((IsAuthenticated,))
def vendor_update_view(request):
    print(request.user.is_vendor)
    if not request.user.is_vendor:
        return Response({'message': 'User is not a Vendor'}, status=HTTP_400_BAD_REQUEST)
    try:
        vendor = Vendors.objects.get(user=request.user)
    except Snippet.DoesNotExist:
        return HttpResponse(status=404)

    serializer = VendorSerializer(vendor, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes((AllowAny,))
def signin_view(request):

    user = authenticate(
        username=request.data['username'],
        password=request.data['password']
    )
    if not user:
        return Response({'detail': 'Invalid Credentials or activate account'}, status=HTTP_404_NOT_FOUND)

    # TOKEN STUFF
    token, _ = Token.objects.get_or_create(user=user)

    # token_expire_handler will check, if the token is expired it will generate new one
    is_expired, token = token_expire_handler(token)
    user_serialized = UserSerializer(user)
    user_serialized.fields.pop('password')

    return Response({
        'user': user_serialized.data,
        'expires_in': expires_in(token),
        'token': token.key
    }, status=HTTP_200_OK)


@api_view(["GET", "POST"])
def testing(request):
    print(request)
    return Response(request.user)


@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def logout(request):
    Token.delete(request.auth)
    return Response({
        'message': 'Logged Out successfully'
    }, status=HTTP_200_OK)


class AddressViewSet(viewsets.ModelViewSet):
    authentication_classes = (ExpiringTokenAuthentication,)
    serializer_class = AddressSerializer
    # get all products on DB
    queryset = Address.objects.all()
    permission_classes = (IsAuthenticated, )

    def perform_create(self, serializer):
        # when a product is saved, its saved how it is the owner
        serializer.save(user=self.request.user)

    def get_queryset(self):
        # after get all products on DB it will be filtered by its owner and return the queryset
        owner_queryset = self.queryset.filter(user=self.request.user)
        return owner_queryset


class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }
            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    email_plaintext_message = "{}?token={}".format(
        reverse('password_reset:reset-password-request'), reset_password_token.key)

    send_mail(
        # title:
        "Password Reset for {title}".format(title="Some website title"),
        # message:
        email_plaintext_message,
        # from:
        "noreply@somehost.local",
        # to:
        [reset_password_token.user.email]
    )
