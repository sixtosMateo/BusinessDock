from docks.api.views import ItemViewSet, OutgoingTransactionViewSet, IncomingTransactionViewSet, VendorViewSet, TransactionItemViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'items', ItemViewSet, base_name='items')
router.register(r'outgoingTransaction', OutgoingTransactionViewSet, base_name='outgoingTransaction')
router.register(r'incomingTransaction', IncomingTransactionViewSet, base_name='incomingTransaction')
router.register(r'transactionItem', TransactionItemViewSet, base_name='transactionItem')
router.register(r'vendors', VendorViewSet, base_name='vendors')
urlpatterns = router.urls
