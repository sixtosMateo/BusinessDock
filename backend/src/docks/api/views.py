from docks.models import Item
from docks.api.serializers import ItemSerializer

from rest_framework.generics import (ListAPIView,
                                    RetrieveAPIView,
                                    CreateAPIView,
                                    DestroyAPIView,
                                    UpdateAPIView
                                    )

class ItemListView(ListAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
