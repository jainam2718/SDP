from django.db import models
from Authuser.models import Vendors


def user_directory_path(instance, filename):
    return 'img/product_{0}/{1}'.format(instance.product.id, filename)

# Create your models here.


class Products(models.Model):
    title = models.CharField(max_length=20)
    catagory = models.CharField(max_length=100)
    vendor = models.ForeignKey(Vendors, on_delete=models.CASCADE)
    amount = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField(default=0)
    discount = models.PositiveIntegerField()
    details = models.CharField(max_length=100)


class ProductImage(models.Model):
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=user_directory_path,
                              height_field=None, width_field=None, max_length=None)
