import graphene


class StatisticsType(graphene.ObjectType):
    active_cases_text = graphene.String(required=True)
    country_text = graphene.String(required=True)
    new_cases_text = graphene.String(required=True)
    new_deaths_text = graphene.String(required=True)
    total_cases_text = graphene.String(required=True)
    total_deaths_text = graphene.String(required=True)
    total_recovered_text = graphene.String(required=True)
    last_update = graphene.String(required=True)
