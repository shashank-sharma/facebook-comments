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
    posts = graph.get_connections(profile, 'posts?limit=100')

    rno = randint(0, len(posts['data'])-1)
    if 'message' in posts['data'][rno]:
        message = posts['data'][rno]['message']
    else:
        message = ''
    postid = posts['data'][rno]['id']
    args = {'fields': 'full_picture,picture', }
    # What if there is no picture


    image = graph.get_object(postid, **args)
    if 'full_picture' in image:
        fullImage = image['full_picture']
    else:
        fullImage = ''
    #comments = graph.get_connections(profile['id'], 'comments')
    return message, fullImage, postid

    # GET description


def getFacebookComments(postId):
    graph = getFacebookGraph()
    comments = graph.get_connections(postId,
                                    'comments?fields=like_count&summary=1')
    totalComments = comments['summary']['total_count']
    commentId = comments['data'][0]['id']
    commentSummary = graph.get_connections(commentId, '?summary=1')
    # Each comment is precious but there are permissions issue

    return totalComments, commentSummary

def getFacebookReplies(commentId):
    graph = getFacebookGraph()
    replies = graph.get_connections(commentId,
                    'comments?fields=like_count,message,from&limit=100')
    totalReplies = []
    totalLikes = []
    totalUsers = []
    while 'paging' in replies:
        for i in replies['data']:
            totalReplies.append(i['message'])
            totalLikes.append(i['like_count'])
            totalUsers.append(i['from']['name'])
        replies = graph.get_connections(commentId,
            'comments?fields=like_count,message,from&after='+replies['paging']['cursors']['after'])

    return totalReplies, totalLikes, totalUsers
