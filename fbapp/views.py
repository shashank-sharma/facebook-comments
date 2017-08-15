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
        message, image, postid = getFacebookPost(userid)
        data = json.dumps([message, image, postid])
        return HttpResponse(data, content_type = "application/json")
    else:
        raise Http404

def getcomments(request):
    if request.is_ajax():
        postid = request.GET['keyword']
        number, summary = getFacebookComments(postid)
        data = json.dumps([number, summary])
        return HttpResponse(data, content_type = "application/json")
    else:
        raise Http404

def getreplies(request):
    if request.is_ajax():
        commentid = request.GET['keyword']
        replies, likes, users = getFacebookReplies(commentid)
        data = json.dumps([replies, likes, users])
        return HttpResponse(data, content_type = "application/json")
    else:
        raise Http404

