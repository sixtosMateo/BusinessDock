from django.conf.urls import url, include, re_path
from rest_framework.urlpatterns import format_suffix_patterns
from django.contrib import admin
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
