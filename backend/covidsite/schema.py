import graphene

from covidsite.covidapi.graphql.query import CovidapiQuery
from covidsite.inquiry.graphql.mutation import InquiryMutations
from covidsite.inquiry.graphql.query import InquiryQuery
from covidsite.users.graphql.mutation import UserMutations
from covidsite.users.graphql.query import UserQuery


class Query(InquiryQuery, UserQuery, CovidapiQuery):
    pass


class Mutation(InquiryMutations, UserMutations):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
