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
        return "{0} {1} {2} {3} {4} {5} {6} {7} {8} {9} {10} ".format(
            self.itemId, self.name, self.inStockQty, self.picture, self.color,
            self.ageRequirement, self.purchasedPrice, self.salePrice,
            self.department, self.barcode,self.createdAt)

class OutgoingTransaction(models.Models):
    transactionId = models.AutoField(primary_key=True)
    createdAt = models.DateTimeField(auto_now=True)
    storeId = models.IntegerField(default = 0, blank=True)
    employeeId = models.CharField(null=True, max_length = 30, default=None)
    tax = models.FloatField(null=True, blank=True, default=0.0925)
    subtotal = models.FloatField(null=True, blank=True, default=None)
    total = models.FloatField(null=True, blank=True, default=None)

    class Meta:
        db_table = ''

    def save(self, *args, **kwargs):
        print('save() is called.')
        super(OutgoingTransaction, self).save(using='')

    def __unicode__(self):
        return "{0} {1} {2} {3} {4} {5} {6}".format(
            self.pk, self.createdAt, self.storeId, self.employeeId,
            self.tax, self.total, self.subtotal)


class IncomingTransaction(models.Model):
    transactionId = models.AutoField(primary_key=True)
    createdAt = models.DateTimeField(auto_now=True)
    vendorId = models.IntegerField(default = 0, blank=True)
    employeeId = models.CharField(max_length = 30, default=None)
    total = models.FloatField(blank=True, default=None)
    subtotal = models.FloatField(blank=True, default=None)
    tax = models.FloatField(null=True, blank=True, default=None)

    class Meta:
        db_table = ""

    def save(self, *args, **kwargs):
        print('save() is called.')
        super(IncomingTransaction, self).save(using="")

    def __unicode__(self):
        return "{0} {1} {2} {3} {4} {5} {6}".format(
            self.transactionId, self.createdAt, self.vendorId, self.employeeId,
            self.tax, self.total, self.subtotal)


class TransactionItem(models.Model):
    barcode = models.CharField(max_length=30, default=None)
    transactionId = models.IntegerField(default = 0, blank=True)
    transactionType = models.CharField(max_length=30, default=None)
    quantity = models.IntegerField(default = 0, blank=True)
    price = models.FloatField(null=True, blank=True, default=None)
    tax = models.FloatField(null=True, blank=True, default=0.0925)
    createdAt = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = ""

    def save(self, *args, **kwargs):
        print('save() is called.')
        super(TransactionItem, self).save(using="")

    def __unicode__(self):
        return "{0} {1} {2} {3} {4} {5} {6}".format(
            self.barcode, self.transactionId, self.transactionType, self.tax,
            self.quantity, self.price, self.createdAt)
