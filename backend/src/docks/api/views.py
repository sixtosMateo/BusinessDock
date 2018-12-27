
from docks.models import Item, OutgoingTransaction
from .serializers import ItemSerializer, OutgoingTransactionSerializer

from rest_framework import viewsets

# putting all Rest-rest_framework generics views(CRUD) into one single view
class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class OutgoingTransactionViewSet(viewsets.ModelViewSet):
    queryset = OutgoingTransaction.objects.all()
    serializer_class = OutgoingTransactionSerializer
