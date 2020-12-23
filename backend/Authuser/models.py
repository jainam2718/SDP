from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class User(AbstractUser):
    phone = models.CharField(max_length=10)
    is_vendor = models.BooleanField(default=True)


class Customers(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_special = models.BooleanField()


class Vendors(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    shop_name = models.CharField(max_length=50)
    address = models.CharField(max_length=200)
    location_long = models.DecimalField(max_digits=9, decimal_places=6)
    location_lat = models.DecimalField(max_digits=9, decimal_places=6)
    pincode = models.CharField(max_length=6)
    cod_available = models.BooleanField(default=True)
    transaction_id = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField()


class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=200)
    address_title = models.CharField(max_length=50)
    pincode = models.CharField(max_length=6)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
