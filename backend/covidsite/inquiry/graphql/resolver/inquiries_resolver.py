import graphene
from graphene import relay

from covidsite.inquiry.graphql.type import InquiryType
from covidsite.inquiry.models import Inquiry


class InquiryConnection(relay.Connection):
    class Meta:
        node = InquiryType


class InquiriesResolver(graphene.ObjectType):
    inquiries = relay.ConnectionField(InquiryConnection)

    def resolve_inquiries(self, info, **kwargs):
        """Retrieve inquiries using Relay.

        Args:
            info (any): Django request object

        Raises:
            Exception: Raised if user is not logged in

        Returns:
            InquiryType[]: Retrieved inquiries
        """
        if info.context.user.is_anonymous:
            raise Exception("Not logged in")
        return Inquiry.objects.all()
