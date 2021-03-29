from rest_framework import serializers
from .models import (CartDetails, ProductOrder, Orders)
from Authuser.models import User
from Authuser.serializers import VendorSerializer, AddressViewSerializer
from ManageShops.serializers import ProductViewSerializer


class CartDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = CartDetails
        fields = ['quantity', 'added_date']


class CartDetailsViewSerializer(serializers.ModelSerializer):

    product = serializers.SerializerMethodField()

    class Meta:
        model = CartDetails
        fields = ['id', 'quantity', 'added_date', 'product']

    def get_product(self, obj):
        product = ProductViewSerializer(obj.product).data
        return product


class OrderViewSerializer(serializers.ModelSerializer):

    address = serializers.SerializerMethodField()
    product = serializers.SerializerMethodField()

    class Meta:
        model = CartDetails
        fields = ['id', 'product', 'delivery_date', 'order_date', 'address']

    def get_address(self, obj):
        address = AddressViewSerializer(obj.address).data
        return address

    def get_product(self, obj):
        product = ProductViewSerializer(obj.product).data
        return product


class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Orders
        fields = ['delivery_date', 'total_amount']
