from django.db import models

# Create your models here.
class Search(models.Model):
	user = models.TextField(max_length = 80, blank = False)

class Clap(models.Model):
	clap = models.BigIntegerField()