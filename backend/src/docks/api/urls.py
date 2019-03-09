from docks.api.views import (ItemViewSet,
                            OutgoingTransactionViewSet,
                            IncomingTransactionViewSet,
                            VendorViewSet,
                            OutgoingTransactionItemViewSet,
                            OutgoingTransactionByEmployeeIdViewSet,
                            IncomingTransactionByEmployeeIdViewSet,
                            IncomingTransactionItemViewSet,
                            StoreViewSet,
                            UserViewSet,
                            DamageItemViewSet,
                            EmployeeViewSet,
                            UserViewSet)

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'items', ItemViewSet, base_name='items')
router.register(r'users', UserViewSet, base_name='users')
router.register(r'outgoingTransaction', OutgoingTransactionViewSet, base_name='outgoingTransaction')
router.register(r'outgoingTransactionById/(?P<employeeId>[0-9]+)', OutgoingTransactionByEmployeeIdViewSet, base_name='outgoingTransactionbyid')
router.register(r'incomingTransactionById/(?P<employeeId>[0-9]+)', IncomingTransactionByEmployeeIdViewSet, base_name='incomingTransactionbyid')
router.register(r'incomingTransaction', IncomingTransactionViewSet, base_name='incomingTransaction')
router.register(r'outgoingtransactionItem', OutgoingTransactionItemViewSet, base_name='outgoingtransactionItem')
router.register(r'incomingtransactionItem', IncomingTransactionItemViewSet, base_name='incomingtransactionItem')
router.register(r'stores', StoreViewSet, base_name='stores')
router.register(r'vendors', VendorViewSet, base_name='vendors')
router.register(r'damageItem', DamageItemViewSet, base_name='damageItem')
router.register(r'employees', EmployeeViewSet, base_name='employees')
urlpatterns = router.urls
