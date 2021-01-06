from rest_framework import serializers
from Authuser.models import Customers, Vendors, User, Address


class UserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(
        style={'input-type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'password2', 'phone', 'is_vendor']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        user = User(
            email=self.validated_data['email'],
            username=self.validated_data['email'],
            is_vendor=self.validated_data['is_vendor'],
            phone=self.validated_data['phone']
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError(
                {'password': 'Passwords Must Match.'})

        user.set_password(password)
        user.save()
        return user

    # Testing Pending
    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.username)
        instance.is_vendor = validated_data.get(
            'is_vendor', instance.is_vendor)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.password = validated_data.get('phone', instance.password)
        instance.save()
        return instance


class VendorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vendors
        fields = ['shop_name', 'address',
                  'location_long', 'location_lat', 'pincode', 'cod_available', 'is_active']

    def save(self):
        vendor = Vendors(
            shop_name=self.validated_data['shop_name'],
            address=self.validated_data['address'],
            location_lat=self.validated_data['location_lat'],
            location_long=self.validated_data['location_long'],
            pincode=self.validated_data['pincode'],
            cod_available=self.validated_data['cod_available'],
            is_active=False
        )
        return vendor

    # Testing Pending
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
        return Address.objects.create(**validated_data)
