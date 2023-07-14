import graphene

from covidsite.users.graphql.type import UserType


class UserSelfResolver(graphene.ObjectType):
    user_self = graphene.Field(UserType)

    def resolve_user_self(self, info):
        """Retrieve the current user.

        Args:
            info (any): Django request object

        Raises:
            Exception: Raised if user is not logged in

        Returns:
            UserType: Retrieved user
        """
        if info.context.user.is_anonymous:
            raise Exception("Not logged in")
        return info.context.user
