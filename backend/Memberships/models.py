from django.db import models
from Authuser.models import Customers, Vendors

# Create your models here.


class SpecialMembership(models.Model):
    customer = models.OneToOneField(Customers, on_delete=models.CASCADE)
    begin_date = models.DateTimeField(auto_now=True, auto_now_add=False)
    end_date = models.DateTimeField()


class VendorsMembership(models.Model):
    vendor = models.OneToOneField(Vendors, on_delete=models.CASCADE)
    begin_date = models.DateTimeField(auto_now=True, auto_now_add=False)
    end_date = models.DateTimeField()
