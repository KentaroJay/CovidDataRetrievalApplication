import graphene

from .create_inquiry_mutation import CreateInquiryMutation


class InquiryMutations(graphene.ObjectType):
    create_inquiry = CreateInquiryMutation.Field()
