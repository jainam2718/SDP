from rest_framework import permissions
from rest_framework.response import Response
import logging


class IsCartOwner(permissions.BasePermission):

    def has_permission(self,request,view):
        return not request.user.is_vendor

    def has_object_permission(self, request, view, obj):
        
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.customer.user == request.user 
