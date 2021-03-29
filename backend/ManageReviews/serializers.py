from rest_framework import serializers
from .models import (Reviews, ReviewImages)
from ManageShops.serializers import ProductViewSerializer 
from Authuser.models import User
from Authuser.serializers import VendorSerializer

class ReviewsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reviews
        # fields = '__all__'
        fields = ['description']


class ReviewsViewSerializer(serializers.ModelSerializer):

    image = serializers.SerializerMethodField()
    product = serializers.SerializerMethodField()
    reviewer_email = serializers.SerializerMethodField()
    class Meta:
        model = Reviews
        # fields = '__all__'
        fields = ['id','image','description','product','reviewer_email']

    def get_image(self, obj):
        img_set = obj.reviewimages_set.all()
        if(len(img_set)!=0):
            imgs_url = []
            for img in img_set:
                imgs_url.append(img.image.url)
            return imgs_url
        return []

    def get_product(self,obj):
        product = ProductViewSerializer(obj.product).data
        return product
    
    def get_reviewer_email(self, obj):
        # print(obj.vendor.user)
        email = obj.user.email
        return email
