from django.shortcuts import render
from getpage import *
from fbapp.models import Search, Clap
from django.http import Http404, HttpResponse
import json

# Create your views here.

def clap(request):
	if request.is_ajax():
		keyword = request.GET['keyword']
		clap = Clap.objects.all()
		if(len(clap) == 0):
			clap = Clap(clap = int(keyword))
			clap.save()
			clapCount = int(keyword)
		else:
			clap[0].clap = int(keyword)
			clap[0].save()
		return HttpResponse({}, content_type = "application/json")
	else:
		raise Http404

def getclap(request):
	if request.is_ajax():
		clap = Clap.objects.all()
		if(len(clap) == 0):
			clap = 0
		else:
			clap = clap[0].clap
		data = json.dumps(clap)
		print(data)
		return HttpResponse(data, content_type = "application/json")
	else:
		raise Http404

def home(request):
    return render(request, 'home.html', {})

def getuser(request):
    if request.is_ajax():
        keyword = request.GET['keyword']
        try:
            user = getFacebookUser(keyword)
        except:
            user = 'no'
        if user != 'no':
        	searchModel = Search.objects.filter(user = keyword)
        	if(not searchModel):
        		searchModel = Search(user = keyword)
        		searchModel.save()
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


def suggest(request):
    if request.is_ajax():
        temp = []
        searchModel = Search.objects.all()
        for i in searchModel.values():
        	temp.append(i['user'])
        temp = list(set(temp))
        print(temp)
        data = json.dumps(temp)
        return HttpResponse(data, content_type = "application/json")
    else:
        raise Http404
