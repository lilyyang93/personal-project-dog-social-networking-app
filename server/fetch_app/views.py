from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view 
from .models import *
import requests as client_request
from requests_oauthlib import OAuth1
from dotenv import load_dotenv
import os 
import json

load_dotenv()

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
            image="human",
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
        auth = OAuth1(os.environ['apikey'], os.environ['secretkey'])

        my_user = request.user.username
        logged_in_user = AppUser.objects.get(username=my_user)
        NP_API_response = client_request.get(f"http://api.thenounproject.com/icon/{logged_in_user.image}", auth=auth)
        responseJSON = NP_API_response.json()
        image_url = responseJSON['icon']['preview_url']
        return JsonResponse({
            "firstname":logged_in_user.first_name,
            "email": logged_in_user.username,
            "location": logged_in_user.city,
            "image": logged_in_user.image,
            "image_url": image_url
        })