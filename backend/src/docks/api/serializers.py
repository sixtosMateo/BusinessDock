from rest_framework import serializers
from docks.models import Item, OutgoingTransaction


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class OutgoingTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = OutgoingTransaction
        fields = '__all__'
