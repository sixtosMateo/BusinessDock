from django.contrib import admin
from django.conf.urls import include, url
from docks import views

urlpatterns = [
    url('admin/', admin.site.urls),
    url('api-auth/', include('rest_framework.urls')),
    url('docks/', include('docks.urls')),
]
