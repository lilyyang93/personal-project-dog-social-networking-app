from django.shortcuts import render
from django.http import HttpResponse, JsonResponse 
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view 
from .models import AppUser

def index(request):
    print('index')
    homepage = open('static/index.html').read()
    return HttpResponse(homepage)

@api_view(["POST"])
def signup(request):
    if request.method == "POST":
        username = request.data['username']
        email = request.data['email']
        password = request.data['password']
        birthdate = request.data['birthdate']
        first_name = request.data['first_name']
        last_name = request.data['last_name']

        new_user = AppUser.objects.create(username=username, email=email, password=password, birthdate=birthdate, first_name=first_name, last_name=last_name)
        new_user.save()
    return JsonResponse({"success":True})

@api_view(["GET", "POST"])
def login(request):
    if request.method == "POST":
        email = request.data['username']
        password = request.data['password']
        print(email, password)
        user = authenticate(request, username=email, password=password)
        print(user)
        if user is not None:
            if user.is_active:
                try: 
                    login(request, user)
                    return JsonResponse({'success': True})
                except Exception as e:
                    return JsonResponse({'success': False, 'reason':'login failed'})
            else:
                return JsonResponse({'success': False, 'reason': 'account disabled'})
        else:
            return JsonResponse({'success': False, 'reason': 'account does not exist'})
    return JsonResponse({'success':True})