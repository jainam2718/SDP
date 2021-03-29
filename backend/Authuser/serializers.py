from django.contrib.auth.models import User
from rest_framework import serializers
from Authuser.models import Customers, Vendors, User, Address


class UserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(
        style={'input-type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'password2',
                  'phone', 'is_vendor', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        user = User(
            email=self.validated_data['email'],
            username=self.validated_data['email'],
            is_vendor=self.validated_data['is_vendor'],
            phone=self.validated_data['phone'],
            first_name=self.validated_data['first_name'],
            last_name=self.validated_data['last_name']
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError(
                {'password': 'Passwords Must Match.'})

        user.set_password(password)
        user.save()
        return user

    # Pending API reserved to be extended
    def update(self, instance, validated_data):
        instance.email = instance.email
        instance.username = instance.username
        instance.is_vendor = validated_data.get(
            'is_vendor', instance.is_vendor)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.password = instance.password
        instance.save()
        return instance


class VendorSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Vendors
        fields = ['id', 'user', 'shop_name', 'address',
                  'location_long', 'location_lat', 'pincode', 'cod_available', 'is_active']

    def create(self, validated_data):
        return Vendors.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.shop_name = validated_data.get(
            'shop_name', instance.shop_name)
        instance.address = validated_data.get('address', instance.address)
        instance.location_long = validated_data.get(
            'location_long', instance.location_long)
        instance.location_lat = validated_data.get(
            'location_lat', instance.location_lat)
        instance.pincode = validated_data.get('pincode', instance.pincode)
        instance.cod_available = validated_data.get(
            'cod_available', instance.cod_available)
        instance.transaction_id = validated_data.get(
            'transaction_id', instance.transaction_id)
        instance.is_active = validated_data.get(
            'is_active', instance.is_active)
        instance.save()
        return instance


class AddressSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Address
        fields = ['user', 'address', 'address_title', 'pincode']

    def create(self, validated_data):
        print(validated_data)
        return Address.objects.create(**validated_data)


class ChangePasswordSerializer(serializers.Serializer):
    model = User

    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


class UserUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'phone',  'first_name', 'last_name']


class AddressViewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = ['id', 'address', 'address_title', 'pincode']
