from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^ajax/getuser', views.getuser, name = 'getuser'),
    url(r'^ajax/getpost', views.getpost, name = 'getpost'),
    url(r'^ajax/getcomments', views.getcomments, name = 'getcomments'),
    url(r'^ajax/getreplies', views.getreplies, name = 'getreplies'),
    url(r'^ajax/suggestionname', views.suggest, name = 'suggest'),
    url(r'^$', views.home, name = 'home'),
]
