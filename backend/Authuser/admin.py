from django.contrib import admin
from Authuser.models import User
from Authuser.models import Customers
from Authuser.models import Vendors
# Register your models here.
admin.site.register(User)
admin.site.register(Customers)
admin.site.register(Vendors)
