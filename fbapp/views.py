from django.shortcuts import render
from getpage import getFacebookPage
from django.http import Http404, HttpResponse
import json

# Create your views here.

def home(request):
    return render(request, 'home.html', {})

def getpage(request):
    if request.is_ajax():
        keyword = request.GET['keyword']
        image = getFacebookPage(keyword)
        print(image)
        data = json.dumps(image)
        return HttpResponse(data, content_type = "application/json")
    else:
        raise Http404
