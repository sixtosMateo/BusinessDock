
from docks.models import Item
from .serializers import ItemSerializer

from rest_framework import viewsets

# putting all Rest-rest_framework generics views(CRUD) into one single view
class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
