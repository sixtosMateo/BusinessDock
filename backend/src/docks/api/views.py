from docks.models import (Item,
                        OutgoingTransaction,
                        IncomingTransaction,
                        Vendor,
                        OutgoingTransactionItem,
                        IncomingTransactionItem,
                        Store,
                        DamageItem,
                        Employee)

from .serializers import (ItemSerializer,
                        OutgoingTransactionSerializer,
                        IncomingTransactionSerializer,
                        VendorSerializer,
                        OutgoingTransactionItemSerializer,
                        IncomingTransactionItemSerializer,
                        StoreSerializer,
                        DamageItemSerializer,
                        EmployeeSerializer,
                        UserSerializer)

from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# putting all Rest-rest_framework generics views(CRUD) into one single view
class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

# access all outgoing transactions
class OutgoingTransactionViewSet(viewsets.ModelViewSet):
    queryset = OutgoingTransaction.objects.all()
    serializer_class = OutgoingTransactionSerializer

# access outgoing transactions based on employeeId
class OutgoingTransactionByEmployeeIdViewSet(viewsets.ModelViewSet):
    serializer_class = OutgoingTransactionSerializer

    def get_queryset(self):
        outgoingTransactionbyid = OutgoingTransaction.objects.filter(employeeId=self.kwargs['employeeId'])
        return outgoingTransactionbyid

# access all incoming transactions
class IncomingTransactionViewSet(viewsets.ModelViewSet):
    queryset = IncomingTransaction.objects.all()
    serializer_class = IncomingTransactionSerializer

# access incoming transactions based on employeeId
class IncomingTransactionByEmployeeIdViewSet(viewsets.ModelViewSet):
    serializer_class = IncomingTransactionSerializer

    def get_queryset(self):
        incomingTransactionbyid = IncomingTransaction.objects.filter(employeeId=self.kwargs['employeeId'])
        return incomingTransactionbyid

class VendorViewSet(viewsets.ModelViewSet):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer

# access all items for each outgoing transaction based on transactionId
class OutgoingTransactionItemViewSet(viewsets.ModelViewSet):
    serializer_class = OutgoingTransactionItemSerializer
    def get_queryset(self):
        outgoingTransactionIdItems = OutgoingTransactionItem.objects.filter(transactionId=self.kwargs['transactionId'])
        return outgoingTransactionIdItems

# access all items for each incoming transaction based on transactionId
class IncomingTransactionItemViewSet(viewsets.ModelViewSet):
    serializer_class = IncomingTransactionItemSerializer
    def get_queryset(self):
        incomingTransactionIdItems = IncomingTransactionItem.objects.filter(transactionId=self.kwargs['transactionId'])
        return incomingTransactionIdItems

class StoreViewSet(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer

class DamageItemViewSet(viewsets.ModelViewSet):
    queryset = DamageItem.objects.all()
    serializer_class = DamageItemSerializer

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
