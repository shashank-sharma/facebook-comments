# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-24 14:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fbapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Clap',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('clap', models.BigIntegerField()),
            ],
        ),
    ]