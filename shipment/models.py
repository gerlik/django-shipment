from django.db import models


class Shipment(models.Model):
    tracking_number = models.CharField(max_length=100, unique=True)
    origin = models.CharField(max_length=255)
    destination = models.CharField(max_length=255)
    status = models.CharField(max_length=50)
    estimated_delivery = models.DateField()

    def __str__(self):
        return self.tracking_number
