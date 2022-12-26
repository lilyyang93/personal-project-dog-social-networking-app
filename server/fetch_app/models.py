from django.db import models
from django.contrib.auth.models import AbstractUser 
from .validators import age_greater_or_equal_to_18

def upload_pet_image(instance, filename):
    # return 'pet_profile_photo/{filename}'.format(filename=filename)
    return '/'.join(['pet_profile_photos/{filename}',]).format(filename=filename)

class AppUser(AbstractUser):
    email = models.EmailField(max_length=255, unique=True)
    birthdate = models.DateField(max_length=8, validators=[age_greater_or_equal_to_18])
    city = models.CharField(max_length=255, default="")
    image = models.CharField(max_length=255, default="")

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return f"user: {self.username}"

class PetProfile(models.Model):
    name = models.CharField(max_length=255)
    birthdate = models.DateField(max_length=8)
    breed = models.CharField(max_length=255)
    gender = models.CharField(max_length=6, choices=[('male','male'),('female','female')])
    spayed_neutered = models.CharField(max_length=3, choices=[('yes','yes'),('no','no')])
    personality = models.CharField(max_length=255)
    likes = models.CharField(max_length=255, default="")
    profile_image = models.ImageField(upload_to=upload_pet_image, default="pet_profile_photo/default.jpg")
    city = models.CharField(max_length=255, default="")
    user_pet = models.ForeignKey(AppUser, on_delete=models.CASCADE)

class Message(models.Model):
    petID = models.CharField(max_length=255)
    title = models.CharField(max_length=255, default="Hi!")
    message = models.CharField(max_length=255, default="Let's be friends!")
    sent_by = models.ForeignKey(PetProfile, on_delete=models.CASCADE, max_length=255)

# class PetPhoto(models.Model):
#     image = models.ImageField(max_length=255, upload_to='dog_pics')
#     pet_id = models.ForeignKey(PetProfile, on_delete=models.CASCADE)#which dog does this this photo record belong to?

# class Favorite(models.Model):
#     favorite_pet = models.CharField(max_length=255) #the primary key of the favorite pet 
#     pet_id = models.ForeignKey(PetProfile, on_delete=models.CASCADE) #which dog's favorites list should this record belong to?

