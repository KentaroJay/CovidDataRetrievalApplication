import graphene
import graphql_jwt

from .create_user_mutation import CreateUserMutation


class UserMutations(graphene.ObjectType):
    create_user = CreateUserMutation.Field()
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
