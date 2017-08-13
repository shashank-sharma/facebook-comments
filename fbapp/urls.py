from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^ajax/getuser', views.getuser, name = 'getuser'),
    url(r'^ajax/getpost', views.getpost, name = 'getpost'),
    url(r'^ajax/getcomments', views.getcomments, name = 'getcomments'),
    url(r'^$', views.home, name = 'home'),
]
