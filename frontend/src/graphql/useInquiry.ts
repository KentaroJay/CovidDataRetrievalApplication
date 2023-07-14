import { useMutation, gql } from "@apollo/client";
import type { CreateInquiryMutationMutation } from "./graphql";

const createInquiryMutation = gql`
  mutation createInquiryMutation(
    $name: String!
    $email: String!
    $comment: String!
  ) {
    createInquiry(input: { name: $name, email: $email, comment: $comment }) {
      inquiry {
        comment
        email
        name
        id
      }
      errors {
        field
        messages
      }
    }
  }
`;

export const useCreateInquiry = () => {
  const [createInquiry, { data, loading, error }] =
    useMutation<CreateInquiryMutationMutation>(createInquiryMutation);
  return { createInquiry, data, loading, error };
};
