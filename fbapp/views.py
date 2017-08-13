from django.shortcuts import render
from getpage import *
from django.http import Http404, HttpResponse
import json

# Create your views here.

def home(request):
    return render(request, 'home.html', {})

def getuser(request):
    if request.is_ajax():
        keyword = request.GET['keyword']
        try:
            user = getFacebookUser(keyword)
        except:
            user = 'no'
        data = json.dumps(user)
        return HttpResponse(data, content_type = "application/json")
    else:
        raise Http404

def getpost(request):
    if request.is_ajax():
        userid = request.GET['keyword']
        post = getFacebookPost(userid)
        data = json.dumps(post)
        return HttpResponse(data, content_type = "application/json")
    else:
        raise Http404

def getcomments(request):
    if request.is_ajax():
        pass
    else:
        raise Http404
