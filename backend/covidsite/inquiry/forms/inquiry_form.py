from django import forms

from covidsite.inquiry.models import Inquiry


class InquiryForm(forms.ModelForm):
    class Meta:
        model = Inquiry
        fields = ("email", "name", "comment")
