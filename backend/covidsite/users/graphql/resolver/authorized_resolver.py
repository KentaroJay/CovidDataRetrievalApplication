import graphene

from covidsite.users.graphql.type import UserType


class AuthorizedQuery(graphene.ObjectType):
    authorized = graphene.Boolean()

    def resolve_authorized(self, info):
        """Check if the user is logged in.

        Args:
            info (any): Django request object

        Returns:
            bool: True if user is logged in, False otherwise
        """
        return info.context.user.is_authenticated
