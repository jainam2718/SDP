from django.db import models
from Authuser.models import Vendors, Address, Customers
from ManageShops.models import Products

# Create your models here.


class Orders(models.Model):
    order_date = models.DateTimeField(auto_now=True, auto_now_add=False)
    delivery_date = models.DateTimeField()
    total_amount = models.PositiveIntegerField()
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customers, on_delete=models.CASCADE)


class ProductOrder(models.Model):
    order = models.ForeignKey(Orders, on_delete=models.CASCADE)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)


class CartDetails(models.Model):
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    customer = models.OneToOneField(Customers, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    added_date = models.DateTimeField(auto_now=True, auto_now_add=False)
