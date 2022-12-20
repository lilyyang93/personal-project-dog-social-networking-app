from django.urls import path
from . import views 

urlpatterns = [
    path("", views.index),
    path("signup", views.signup),
    path("homepage", views.homepage),
    path("logout", views.logout_user),
    path("editprofile", views.edit_profile),
    path("addpetprofile", views.add_pet_profile),
]