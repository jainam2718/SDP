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
            is_vendor=self.validated_data['is_vendor']
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError(
                {'password': 'Passwords Must Match.'})

        user.set_password(password)
        user.save()
        return user


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


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['user', 'address', 'address_title', 'pincode']


"""
class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendors
        fields = ['phone', 'shop_name', 'address',
                  'location_long', 'location_lat', 'pincode', 'cod_available', 'is_active']
        owner = serializers.ReadOnlyField(source='owner.username')

    def create(self, validated_data):
        return Snippet.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.code = validated_data.get('code', instance.code)
        instance.linenos = validated_data.get('linenos', instance.linenos)
        instance.language = validated_data.get('language', instance.language)
        instance.style = validated_data.get('style', instance.style)
        instance.save()
        return instance
"""
