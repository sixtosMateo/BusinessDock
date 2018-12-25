from docks.api.views import ItemListView
from django.urls import path
from django.conf.urls import url


urlpatterns = [

    url(r'^', ItemListView.as_view()),
#     path('create/', ArticleCreateView.as_view()),
#     path('<pk>', ArticleDetailView.as_view()),
#     path('<pk>/update/', ArticleUpdateView.as_view()),
#     path('<pk>/delete/', ArticleDeleteView.as_view()),
]
