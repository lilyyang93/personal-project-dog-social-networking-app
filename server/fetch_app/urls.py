from django.urls import path
from . import views 

urlpatterns = [
    path("", views.index),
    path("signup", views.signup),
    path("homepage", views.homepage),
    path("logout", views.logout_user),
    path("editprofile", views.edit_profile),
    path("addpetprofile", views.add_pet_profile),
    path("findfriends", views.find_friends),
    path("viewfriend<int:petID>", views.view_friend),
    path("viewmypets", views.view_my_pets),
    path("editpetprofile<int:petID>", views.edit_pet_profile),
]