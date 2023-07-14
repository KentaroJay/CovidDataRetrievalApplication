from covidsite.inquiry.graphql.resolver import InquiriesResolver, InquiryResolver


class InquiryQuery(InquiryResolver, InquiriesResolver):
    pass
