from covidsite.users.graphql.resolver.authorized_resolver import AuthorizedQuery
from covidsite.users.graphql.resolver.user_self_resolver import UserSelfResolver
from covidsite.users.graphql.type import UserType


class UserQuery(UserSelfResolver, AuthorizedQuery):
    pass
