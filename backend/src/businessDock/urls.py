from django.contrib import admin
from django.conf.urls import include, url, re_path
from django.contrib.auth.models import User
from django.views.generic import TemplateView


from docks import views

urlpatterns = [
    url('admin/', admin.site.urls),
    url('api-auth/', include('rest_framework.urls')),
    url('rest-auth/', include('rest_auth.urls')),
    url('docks/', include('docks.urls')),
    re_path('.*', TemplateView.as_view(template_name='index.html')),
]
