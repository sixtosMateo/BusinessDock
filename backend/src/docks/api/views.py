
from docks.models import Item, OutgoingTransaction, IncomingTransaction, Vendor, TransactionItem
from .serializers import (ItemSerializer,
                        OutgoingTransactionSerializer,
                        IncomingTransactionSerializer,
                        VendorSerializer,
                        TransactionItemSerializer)

from rest_framework import viewsets

# putting all Rest-rest_framework generics views(CRUD) into one single view
class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class OutgoingTransactionViewSet(viewsets.ModelViewSet):
    queryset = OutgoingTransaction.objects.all()
    serializer_class = OutgoingTransactionSerializer

class IncomingTransactionViewSet(viewsets.ModelViewSet):
    queryset = IncomingTransaction.objects.all()
    serializer_class = IncomingTransactionSerializer

class VendorViewSet(viewsets.ModelViewSet):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer

class TransactionItemViewSet(viewsets.ModelViewSet):
    queryset = TransactionItem.objects.all()
    serializer_class = TransactionItemSerializer
