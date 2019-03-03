from __future__ import unicode_literals
from django.db import models
import datetime
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.utils import timezone



class Store(models.Model):
    storeId = models.AutoField(primary_key=True)
    name = models.CharField(max_length = 30, default=None)
    address = models.CharField(max_length = 50, default=None)
    hoursOpen =  models.CharField(max_length = 150, default=None)
    phoneNumber = models.CharField(max_length = 30, default=None)

    class Meta:
        db_table = 'docks_store'

    def save(self, *args, **kwargs):
        print('save() is called.')
        super(Store, self).save(using='')

    def __unicode__(self):
        return "{0} {1} {2} {3} {4}".format(
            self.pk, self.name, self.address, self.hoursOpen, self.phoneNumber)


class Vendor(models.Model):
    vendorId = models.AutoField(primary_key=True)
    address = models.CharField(max_length = 100, default=None)
    phoneNumber = models.CharField(max_length = 30, default=None)
    name = models.CharField(max_length = 30, default=None)
    hoursOpen = models.CharField(max_length = 150, default=None)

    class Meta:
        db_table = "docks_vendor"

    def save(self, *args, **kwargs):
        print('save() is called.')
        super(Vendor,self).save(using="")

    def __unicode__(self):
        return "{0} {1} {2} {3} {4}".format(
            self.vendorId, self.address, self.phoneNumber, self.name,
            self.hoursOpen)


class Employee(models.Model):
    employeeId = models.AutoField(primary_key=True)
    userId = models.IntegerField(unique=True, default=None)
    storeId = models.IntegerField(default = 0, blank=True)
    birthDate = models.DateField(blank=True)
    age = models.IntegerField(default = 0, blank=True)
    employmentType = models.CharField(max_length = 30, default=None)
    createdAt = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table="docks_employee"

    def save(self, *args, **kwargs):
        print('Employee save() is called.')
        super(Employee, self).save(using='')

    def __unicode__(self):
        return "{0} {1} {2} {3} {4} {5} {6}".format(
            self.employeeId, self.userId, self.storeId, self.birthDate, self.age,
            self.employmentType, self.createdAt)



class Item(models.Model):
    itemId = models.AutoField(primary_key=True)
    barcode = models.CharField(unique=True, max_length=30, default=None)
    name = models.CharField(max_length = 30, default=None)
    inStockQty = models.IntegerField(default = 0, blank=True)
    color = models.CharField(max_length = 30, default=None)
    ageRequirement = models.CharField(max_length = 30, default=None)
    purchasedPrice = models.FloatField(default = 0.0, blank=True)
    salePrice = models.FloatField(default = 0.0, blank=True)
    department = models.CharField(max_length = 30, default=None)
    createdAt = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "docks_item"

    def save(self, *args, **kwargs):
        print('Item save() is called.')
        super(Item, self).save(using='')

    def __unicode__(self):
        return "{0} {1} {2} {3} {4} {5} {6} {7} {8} {9} {10} ".format(
            self.itemId, self.name, self.inStockQty, self.picture, self.color,
            self.ageRequirement, self.purchasedPrice, self.salePrice,
            self.department, self.barcode,self.createdAt)


class DamageItem(models.Model):
    itemId = models.AutoField(primary_key=True)
    quantity = models.IntegerField(default = 0, blank=True)
    createdAt = models.DateTimeField(auto_now=True)
    employeeId = models.CharField(max_length = 30, default=None)
    storeId = models.IntegerField(default = 0, blank=True)
    locationId = models.IntegerField(default = 0, blank=True)
    barcode = models.CharField(unique=True, max_length = 30, default=None)
    description=models.CharField(max_length = 500, default=None)

    class Meta:
        db_table = "docks_damageitem"

    def save(self, *args, **kwargs):
        print('save() is called.')
        super(DamageItem,self).save(using="")

    def __unicode__(self):
        return "{0} {1} {2} {3} {4} {5} {6} {7}".format(
            self.itemId, self.quantity, self.createdAt, self.employeeId,
            self.storeId, self.locationId, self.barcode, self.description)

class OutgoingTransaction(models.Model):
    transactionId = models.AutoField(primary_key=True)
    createdAt = models.DateTimeField(auto_now=True)
    storeId = models.IntegerField(default = 0, blank=True)
    employeeId = models.CharField(null=True, max_length = 30, default=None)
    tax = models.FloatField(null=True, blank=True, default=0.0925)
    subtotal = models.FloatField(null=True, blank=True, default=None)
    total = models.FloatField(null=True, blank=True, default=None)

    class Meta:
        db_table = 'docks_outgoingtransaction'

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
        db_table = "docks_incomingtransaction"

    def save(self, *args, **kwargs):
        print('save() is called.')
        super(IncomingTransaction, self).save(using="")

    def __unicode__(self):
        return "{0} {1} {2} {3} {4} {5} {6}".format(
            self.transactionId, self.createdAt, self.vendorId, self.employeeId,
            self.tax, self.total, self.subtotal)


class IncomingTransactionItem(models.Model):
    barcode = models.CharField(max_length=30, default=None)
    transactionId = models.IntegerField(default = 0, blank=True)
    name = models.CharField(max_length = 30, default=None)
    transactionType = models.CharField(max_length=30, default=None)
    quantity = models.IntegerField(default = 0, blank=True)
    price = models.FloatField(null=True, blank=True, default=None)
    tax = models.FloatField(null=True, blank=True, default=0.0925)
    itemSaleTotal = models.FloatField(null=True, blank=True, default=None)
    createdAt = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "docks_incomingtransactionitem"

    def save(self, *args, **kwargs):
        print('save() is called.')
        super(TransactionItem, self).save(using="")

    def __unicode__(self):
        return "{0} {1} {2} {3} {4} {5} {6}".format(
            self.barcode, self.transactionId, self.transactionType, self.tax,
            self.quantity, self.price, self.createdAt)


class OutgoingTransactionItem(models.Model):
    barcode = models.CharField(max_length=30, default=None)
    transactionId = models.IntegerField(default = 0, blank=True)
    name = models.CharField(max_length = 30, default=None)
    transactionType = models.CharField(max_length=30, default=None)
    quantity = models.IntegerField(default = 0, blank=True)
    price = models.FloatField(null=True, blank=True, default=None)
    tax = models.FloatField(null=True, blank=True, default=0.0925)
    itemSaleTotal = models.FloatField(null=True, blank=True, default=None)
    createdAt = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "docks_outgoingtransactionitem"

    def save(self, *args, **kwargs):
        print('save() is called.')
        super(TransactionItem, self).save(using="")

    def __unicode__(self):
        return "{0} {1} {2} {3} {4} {5} {6}".format(
            self.barcode, self.transactionId, self.transactionType, self.tax,
            self.quantity, self.price, self.createdAt)
# Create your models here.
