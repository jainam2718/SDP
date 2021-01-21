from django.db import models
from ManageShops.models import Products
from Authuser.models import User

# Create your models here.
def review_img_directory_path(instance, filename): 
    # file will be uploaded to MEDIA_ROOT / user_<id>/<filename> 
    return 'reviews/img/user_{0}/{1}'.format(instance.user.id, filename) 

class Reviews(models.Model):
    discription = models.CharField(max_length=1000)
    Product = models.ForeignKey(Products, on_delete=models.CASCADE)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

class ReviewImages(models.Model):
    image = models.ImageField(upload_to=review_img_directory_path, height_field=None, width_field=None, max_length=None)
    review = models.ForeignKey(Reviews, on_delete=models.CASCADE)