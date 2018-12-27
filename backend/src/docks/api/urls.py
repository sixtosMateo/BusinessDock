from docks.api.views import ItemViewSet, OutgoingTransactionViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'items', ItemViewSet, base_name='items')
router.register(r'outgoingTransaction', OutgoingTransactionViewSet, base_name='outgoingTransaction')
urlpatterns = router.urls
