from django.contrib import admin
from .models import (Products, ProductImage)

# Register your models here.

admin.site.register(Products)
admin.site.register(ProductImage)
