from graphene import relay
from graphene_django import DjangoObjectType

from covidsite.inquiry.models import Inquiry


class InquiryType(DjangoObjectType):
    class Meta:
        model = Inquiry
        interfaces = (relay.Node,)
        fields = ("id", "email", "name", "comment")
