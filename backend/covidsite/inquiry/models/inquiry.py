from django.db import models


class Inquiry(models.Model):
    email = models.EmailField("Customer's Email Address", max_length=254)
    name = models.CharField("Customer's Name", max_length=100)
    comment = models.TextField("Customer's Comment", max_length=500)

    def __str__(self):
        return self.name
