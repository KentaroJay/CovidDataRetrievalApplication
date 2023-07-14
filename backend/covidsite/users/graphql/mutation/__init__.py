"""
Mutations mount class file ends with mutation.
Mutation implementation file starts with:
  - create
  - update
  - delete

 ---------- Mutation implementation class explained -----------------------
|                                                                      |
| # MUTATION TO CREATE SOMETHING                                       |
| class CreateSomething(graphene.Mutation):                            |
|                                                                      |
|     # THIS FIELD DEFINES THE OUTPUT TYPE OF THE MUTATION             |
|     user = graphene.Field(SomeType)                                  |
|                                                                      |
|     # THIS CLASS DEFINES THE INPUT ARGUMENTS OF THE MUTATION         |
|     class Arguments:                                                 |
|         username = graphene.String(required=True)                    |
|         ~~~~~~This is the input argument~~~~~~                       |
|                                                                      |
|     # THIS METHOD IS RESPONSIBLE FOR CREATING THE USER OBJECT        |
|     # AND SAVING IT IN THE DATABASE                                  |
|     def mutate(self, info, username, password, email):               |
|         user.save()                                                  |
|         ~~~~~~This is the logic to create the user object~~~~~~      |
 ----------------------------------------------------------------------
"""

from covidsite.users.graphql.mutation.create_user_mutation import CreateUserMutation
from covidsite.users.graphql.mutation.user_mutations import UserMutations
