import graphene
from django.contrib.auth import get_user_model

from covidsite.users.graphql.type import UserType


class CreateUserMutation(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, username, password, email):
        """Create a user.

        Args:
            info (any): Django request object
            username (str): Username of the user to create
            password (str): Password of the user to create
            email (str): Email of the user to create

        Returns:
            UserType: Created user
        """
        user = get_user_model()(
            username=username,
            email=email,
        )
        user.set_password(password)
        user.save()
        return CreateUserMutation(user=user)
