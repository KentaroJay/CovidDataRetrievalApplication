import graphene

from covidsite.inquiry.graphql.type import InquiryType
from covidsite.inquiry.models import Inquiry


class InquiryResolver(graphene.ObjectType):
    inquiry = graphene.Field(InquiryType, id=graphene.ID())

    def resolve_inquiry(self, info, id):
        """Retrieve a single inquiry.

        Args:
            info (any): Django request object
            id (ID): ID of the inquiry to retrieve

        Raises:
            Exception: Raised if user is not logged in

        Returns:
            InquiryType: Retrieved inquiry
        """
        if info.context.user.is_anonymous:
            raise Exception("Not logged in")
        return Inquiry.objects.get(pk=id)
