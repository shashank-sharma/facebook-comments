import facebook
import os
from random import randint

def getFacebookGraph():
    access_token = os.environ["ACCESS_TOKEN"]
    graph = facebook.GraphAPI(access_token = access_token)
    return graph

def getFacebookUser(keyword):
    graph = getFacebookGraph()
    user = keyword

    profile = graph.get_object(user)
    return profile

def getFacebookPost(profile):
    graph = getFacebookGraph()
    posts = graph.get_connections(profile, 'posts')

    postid = posts['data'][randint(0, len(posts['data']))]['id']
    args = {'fields': 'full_picture,picture', }

    image = graph.get_object(postid, **args)
    #comments = graph.get_connections(profile['id'], 'comments')
    return image['full_picture']

    # GET description
