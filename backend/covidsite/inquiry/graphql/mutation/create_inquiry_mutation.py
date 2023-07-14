import graphene
from django.core.mail import send_mail
from graphene_django.forms.mutation import DjangoModelFormMutation

from covidsite.inquiry.forms import InquiryForm
from covidsite.inquiry.graphql.type import InquiryType


class CreateInquiryMutation(DjangoModelFormMutation):
    inquiry = graphene.Field(InquiryType)

    class Meta:
        form_class = InquiryForm

    @classmethod
    def perform_mutate(cls, form, info):
        """Override the default perform_mutate method to perform unique logic.

        Args:
            form (InquiryForm): Django form object
            info (any): Django request object

        Returns:
            DjangoModelFormMutation: DjangoModelFormMutation object
        """
        obj = form.save()

        # You can send email to info@corpy.co.jp here.(uncomment to use)
        # try:
        #     send_mail(
        #         f"Inqury from {obj.name}",
        #         f"Here is the message.\n{obj.comment}",
        #         ["info@corpy.co.jp"],
        #         fail_silently=False,
        #     )
        # except Exception as e:
        #     print(e)
        #     raise e
        # else:

        # You can send also cofirmation email here.
        kwargs = {cls._meta.return_field_name: obj}
        return cls(errors=[], **kwargs)
