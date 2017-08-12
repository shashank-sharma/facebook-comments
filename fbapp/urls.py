from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^ajax/getpage', views.getpage, name = 'getpage'),
    url(r'^$', views.home, name = 'home'),
]
