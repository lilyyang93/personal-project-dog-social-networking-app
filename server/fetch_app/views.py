from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view 
from .models import *
from django.core.serializers import serialize
import requests as client_request
from requests_oauthlib import OAuth1
from dotenv import load_dotenv
import os 
import json

load_dotenv()
auth = OAuth1(os.environ['apikey'], os.environ['secretkey'])

@api_view(["GET", "POST"])
def index(request):
    if request.method == "GET":
        homepage = open("static/index.html").read()
        return HttpResponse(homepage)
    elif request.method == "POST":
        email = request.data["email"]
        password = request.data["password"]
        user = authenticate(username=email, password=password)
        if user is not None:
            if user.is_active:
                try: 
                    login(request, user)
                    return JsonResponse({"success":True})
                except Exception as e:
                    return JsonResponse({"success": False, "reason":"login failed"})
            else:
                return JsonResponse({"success": False, "reason": "account disabled"})
        else:
            return JsonResponse({"success": False, "reason": "account does not exist"})
    return JsonResponse({"success":True})

@api_view(["POST"])
def signup(request):
    if request.method == "POST":
        username = request.data["username"]
        email = request.data["email"]
        password = request.data["password"]
        birthdate = request.data["birthdate"]
        first_name = request.data["first_name"] 
        last_name = request.data["last_name"]
        city = request.data["city"]

        new_user = AppUser.objects.create(
            username=username, 
            email=email, 
            password=password, 
            birthdate=birthdate, 
            first_name=first_name, 
            last_name=last_name,
            city=city,
            image="user",
        )
        new_user.set_password(password)
        new_user.save()
    return JsonResponse({"success":True})

@api_view(["POST"])
def logout_user(request):
    logout(request)
    return JsonResponse({"success":True})

@api_view(["GET"])
@login_required
def homepage(request):
    if request.method == "GET":
        my_user = request.user.username
        logged_in_user = AppUser.objects.get(username=my_user)
        NP_API_response = client_request.get(f"http://api.thenounproject.com/icon/{logged_in_user.image}", auth=auth)
        responseJSON = NP_API_response.json()
        image_url = responseJSON['icon']['preview_url']
        try:
            my_user_pets = PetProfile.objects.get(user_pet_id=logged_in_user.id)
            pet_names = my_user_pets.name
        except:
            my_user_pets = None
            pet_names = None
        return JsonResponse({
            "firstname":logged_in_user.first_name,
            "email": logged_in_user.username,
            "location": logged_in_user.city,
            "image": logged_in_user.image,
            "image_url": image_url,
            "pet_names": pet_names,
        })

@api_view(["GET", "PUT"])
@login_required
def edit_profile(request):
    if request.method == "PUT":
        my_user = request.user.id
        logged_in_user = AppUser.objects.get(id=my_user)
        new_value = request.data['new_value']
        if request.data['attribute'] == 'last_name':
            logged_in_user.last_name = new_value
            logged_in_user.save()
            return JsonResponse({'success': True})
        elif request.data['attribute'] == 'first_name':
            logged_in_user.first_name = new_value
            logged_in_user.save()
            return JsonResponse({'success': True})
        elif request.data['attribute'] == 'city':
            logged_in_user.city = new_value
            logged_in_user_pets = PetProfile.objects.all().filter(user_pet_id=my_user)
            logged_in_user.save()
            logged_in_user_pets.update(city=new_value)
            for pet in logged_in_user_pets:
                pet.save()
            return JsonResponse({'success': True})
        elif request.data['attribute'] == 'image':
            logged_in_user.image = new_value
            logged_in_user.save()
            return JsonResponse({'success': True})
        return JsonResponse({'success':False})

@api_view(["GET", "POST"])
@login_required
def add_pet_profile(request):
    if request.method == "POST":
        pet_name = request.data["pet_name"]
        pet_birthdate = request.data["pet_birthdate"]
        pet_breed = request.data["pet_breed"]
        pet_gender = request.data["pet_gender"]
        spayed_neutered = request.data["spayed_neutered"] 
        pet_personality = request.data["pet_personality"]
        pet_likes = request.data["pet_likes"]
        pet_profile_photo = request.data["pet_profile_photo"]
        pet_city = request.user.city

        new_pet = PetProfile.objects.create(
            name=pet_name, 
            birthdate=pet_birthdate, 
            breed=pet_breed, 
            gender=pet_gender, 
            spayed_neutered=spayed_neutered, 
            personality=pet_personality,
            likes=pet_likes,
            profile_image=pet_profile_photo,
            city=pet_city,
            user_pet_id=request.user.id,
        )
        new_pet.save()
        return JsonResponse({"success":True})

@api_view(["GET"])
@login_required       
def find_friends(request):
    if request.method == "GET":
        user = request.user.id
        user_city = request.user.city
        dog_API_response = client_request.get("https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1")
        responseJSON = dog_API_response.json()[0]
        image_url = responseJSON['url']
        area_friends = PetProfile.objects.all().filter(city=user_city).exclude(user_pet_id=user)
        friends = json.loads(serialize('json', area_friends))
        return JsonResponse({"friends":friends, "dog_image":image_url})

@api_view(["GET"])
@login_required  
def view_friend(request, petID):
    if request.method == "GET":
        petID = request.query_params['petID']
        view_pet = PetProfile.objects.get(id=petID)
        return JsonResponse({
            "name": view_pet.name,
            "birthdate": view_pet.birthdate,
            "breed": view_pet.breed,
            "gender": view_pet.gender,
            "spayed_neutered": view_pet.spayed_neutered,
            "personality": view_pet.personality,
            "likes": view_pet.likes,
            "profile_image": str(view_pet.profile_image),
            })

@api_view(["GET"])
@login_required          
def view_my_pets(request):
    if request.method == "GET":
        user = request.user.id
        filtered_pets = PetProfile.objects.all().filter(user_pet_id=user)
        my_pets = json.loads(serialize('json', filtered_pets))
        return JsonResponse({'pets':my_pets})

@api_view(["GET", "PUT"])
@login_required   
def edit_pet_profile(request, petID):
    if request.method == "PUT":
        petID = request.data['petID']
        pet_to_update = PetProfile.objects.get(id=petID)
        new_value = request.data['new_value']
        if request.data['attribute'] == 'breed':
            pet_to_update.breed = new_value
            pet_to_update.save()
            return JsonResponse({'success': True})
        elif request.data['attribute'] == 'gender':
            pet_to_update.gender = new_value
            pet_to_update.save()
            return JsonResponse({'success': True})
        elif request.data['attribute'] == 'personality':
            pet_to_update.personality = new_value
            pet_to_update.save()
            return JsonResponse({'success': True})
        elif request.data['attribute'] == 'likes':
            pet_to_update.likes = new_value
            pet_to_update.save()
            return JsonResponse({'success': True})
        elif request.data['attribute'] == 'spayed_neutered':
            pet_to_update.spayed_neutered = new_value
            pet_to_update.save()
            return JsonResponse({'success': True})
        elif request.data['attribute'] == 'image':
            pet_to_update.image = new_value
            pet_to_update.save()
            return JsonResponse({'success': True})
        return JsonResponse({'success':False})

@api_view(["GET", "POST"])
@login_required   
def send_message(request, petID):
    my_user = request.user.id
    if request.method == "GET":
        pet_ID = request.query_params['petID']
        message_petID = PetProfile.objects.get(id=pet_ID)
        return JsonResponse({
            "name": message_petID.name,
            })
    elif request.method == "POST":
        petID = request.data["petID"]
        title = request.data["title"]
        message = request.data["message"]
        new_message = Message.objects.create(
            petID = petID,
            title = title,
            message = message,
            sent_by_id = my_user
        )
        new_message.save()
        return JsonResponse({"success":True})
