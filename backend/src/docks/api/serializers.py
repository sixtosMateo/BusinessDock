from rest_framework import serializers
from docks.models import (Item,
                        OutgoingTransaction,
                        IncomingTransaction,
                        Vendor,
                        OutgoingTransactionItem,
                        IncomingTransactionItem,
                        Store,
                        DamageItem,
                        Employee)


from django.contrib.auth.models import User



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'first_name', 'last_name', 'email', 'is_staff', 'date_joined')


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class OutgoingTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = OutgoingTransaction
        fields = '__all__'

class IncomingTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncomingTransaction
        fields = '__all__'

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = '__all__'

class OutgoingTransactionItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OutgoingTransactionItem
        fields = '__all__'

class IncomingTransactionItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncomingTransactionItem
        fields = '__all__'

class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = '__all__'

class DamageItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = DamageItem
        fields = '__all__'

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'
