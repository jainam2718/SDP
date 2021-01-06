from django.contrib import admin
from Authuser.models import User, Customers, Vendors, Address
# Register your models here.
admin.site.register(User)
admin.site.register(Customers)
admin.site.register(Vendors)
admin.site.register(Address)
