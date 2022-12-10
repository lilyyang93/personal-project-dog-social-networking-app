from django.urls import path
from . import views 

urlpatterns = [
    path('', views.index),
    path('signup', views.signup),
    path('login', views.login_user),
    path('homepage', views.homepage),
]