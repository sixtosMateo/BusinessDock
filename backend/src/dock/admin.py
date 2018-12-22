from django.db import models
from django.contrib.auth.models import User


class Employee(models.Model):

    employeeId = models.CharField(max_length = 30, default=None)
    firstName = models.CharField(max_length = 30, default=None)
    lastName = models.CharField(max_length = 30, default=None)
    storeId = models.IntegerField(default = 0, blank=True)
    birthDate = models.DateField(blank=True)
    age = models.IntegerField(default = 0, blank=True)
    employmentType = models.CharField(max_length = 30, default=None)


    createdAt = models.DateTimeField(default=timezone.now)


class Item(models.Models):
    itemId = models.AutoField(primary_key=True)
    barcode = models.CharField(unique=True, max_length=30, default=None)
    name = models.CharField(max_length = 30, default=None)
    inStockQty = models.IntegerField(default = 0, blank=True)
    picture = models.CharField(max_length = 30, default=None)
    color = models.CharField(max_length = 30, default=None)
    ageRequirement = models.CharField(max_length = 30, default=None)
    purchasedPrice = models.FloatField(default = 0.0, blank=True)
    salePrice = models.FloatField(default = 0.0, blank=True)
    department = models.CharField(max_length = 30, default=None)
    createdAt = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "item"

    def save(self, *args, **kwargs):
        print('Item save() is called.')
        super(Item, self).save(using='')

    def __unicode__(self):
        return "{0} {1} {2} {3} {4} {5} {6} {7} {8} {9} {10} {11} ".format(
            self.itemId, self.name, self.inStockQty, self.picture, self.color,
            self.ageRequirement, self.purchasedPrice, self.salePrice,
            self.department, self.barcode,
            self.createdAt)
