import graphene


class CountriesType(graphene.ObjectType):
    countries = graphene.List(graphene.String)
