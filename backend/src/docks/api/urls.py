from docks.api.views import ItemViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', ItemViewSet, base_name='items')
urlpatterns = router.urls
