# Python
from datetime import datetime

# Django
from django.shortcuts import render

# Rest Framework
from rest_framework import generics, viewsets, views
from rest_framework.decorators import api_view, permission_classes
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
from .permissions import IsCartOwner
from .models import Orders as OrdersModel, CartDetails as CartDetailsModel, ProductOrder
from .serializers import CartDetailsSerializer, CartDetailsViewSerializer, OrderSerializer, OrderViewSerializer
from ManageShops.serializers import ProductSerializer
from ManageShops.models import Products
from Authuser.models import User, Address
import stripe


class CartDetails(viewsets.ModelViewSet):

    queryset = CartDetailsModel.objects.all()
    serializer_class = CartDetailsSerializer
    permission_classes = [IsAuthenticated, IsCartOwner]

    def update(self, request, *args, **kwargs):
        product = Products.objects.get(pk=self.request.data.get('pid'))
        cart = CartDetailsSerializer(
            CartDetailsModel.objects.get(pk=kwargs['pk']), data=request.data)

        if cart.is_valid() and int(request.data['quantity']) <= product.quantity:
            cart.save()
            c = CartDetailsViewSerializer(
                self.queryset.filter(
                    customer=self.request.user.customers, placed=False), many=True)
            print(c.data)
            return Response(c.data, status=HTTP_200_OK)
        else:
            return Response({'msg': 'More quantity is not available', 'cart': CartDetailsViewSerializer(
                self.queryset.filter(
                    customer=self.request.user.customers, placed=False), many=True).data}, status=HTTP_400_BAD_REQUEST)
        return Response()

    def get_serializer_class(self):
        if self.action == 'list':
            return CartDetailsViewSerializer
        if self.action == 'retrieve':
            return CartDetailsViewSerializer
        return CartDetailsSerializer

    def get_queryset(self):
        owner_queryset = self.queryset.filter(
            customer=self.request.user.customers, placed=False)
        print(owner_queryset)
        return owner_queryset

    def perform_create(self, serializer):
        product = Products.objects.get(pk=self.request.data['pid'])
        serializer.save(customer=self.request.user.customers, product=product)


class Orders(viewsets.ModelViewSet):

    queryset = CartDetailsModel.objects.all()
    serializer_class = OrderViewSerializer
    permission_classes = [IsAuthenticated, IsCartOwner]

    def get_queryset(self):
        owner_queryset = self.queryset.filter(
            customer=self.request.user.customers, placed=True)
        return owner_queryset


@ api_view(['POST', ])
@ permission_classes((IsAuthenticated,))
def charge(request):
    stripe.api_key = "sk_test_51IMTY6BVij55aMSV1elLIs8JXvLXucb6FsLGEbZGIRQw4xMqYBSrrkwWqAMr5JoQn4JyMrSoSL90QAjvw1kT5ldi00b4RTm6vi"
    try:
        customer = stripe.Customer.create(
            email=request.data['email'],
            name=request.data['email'],
            source=request.data['stripeToken']
        )
        user = User.objects.get(email=request.user)
        carts = CartDetailsModel.objects.all().filter(
            customer=user.customers, placed=False)
        amount = int(0)
        # address = Address.objects.get(pk=request.data['address_id'])
        products = []
        for cart in carts:
            amount += (cart.product.amount*cart.product.quantity)
            products.append(cart.product.id)
        print(amount)
        charge = stripe.Charge.create(
            customer=customer,
            amount=int(amount)*100,
            currency='inr',
            description='order',
        )
        print(request.data)
        for cart in carts:
            cart.placed = bool(True)
            cart.order_date = datetime.now()
            cart.address = Address.objects.get(pk=request.data['id'])
            cart.save()
        return Response("Success")
    except stripe.error.CardError as e:
        print(e)
        pass
    except stripe.error.RateLimitError as e:
        # Too many requests made to the API too quickly
        print(e)
    except stripe.error.InvalidRequestError as e:
        # Invalid parameters were supplied to Stripe's API
        print(e)
    except stripe.error.AuthenticationError as e:
        # Authentication with Stripe's API failed
        # (maybe you changed API keys recently)
        print(e)
    except stripe.error.APIConnectionError as e:
        # Network communication with Stripe failed
        print(e)
    except stripe.error.StripeError as e:
        # Display a very generic error to the user, and maybe send
        # yourself an email
        print(e)
    except Exception as e:
        # Something else happened, completely unrelated to Stripe
        print(e)
    else:
        print("else")

    return Response("Error")
