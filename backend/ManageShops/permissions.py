from rest_framework import permissions
from rest_framework.response import Response
import logging


class IsVendor(permissions.BasePermission):

    def has_permission(self,request,view):
        return request.user.is_vendor

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.vendor.user == request.user and request.user.is_vendor

class IsProductOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.product.vendor == request.user.vendors