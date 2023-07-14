export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  GenericScalar: any;
};

export type CountriesType = {
  __typename?: "CountriesType";
  countries?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type CreateInquiryMutationInput = {
  clientMutationId?: InputMaybe<Scalars["String"]>;
  comment: Scalars["String"];
  email: Scalars["String"];
  id?: InputMaybe<Scalars["ID"]>;
  name: Scalars["String"];
};

export type CreateInquiryMutationPayload = {
  __typename?: "CreateInquiryMutationPayload";
  clientMutationId?: Maybe<Scalars["String"]>;
  errors: Array<ErrorType>;
  inquiry?: Maybe<InquiryType>;
};

export type CreateUserMutation = {
  __typename?: "CreateUserMutation";
  user?: Maybe<UserType>;
};

export type ErrorType = {
  __typename?: "ErrorType";
  field: Scalars["String"];
  messages: Array<Scalars["String"]>;
};

export type InquiryConnection = {
  __typename?: "InquiryConnection";
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<InquiryEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `Inquiry` and its cursor. */
export type InquiryEdge = {
  __typename?: "InquiryEdge";
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
  /** The item at the end of the edge */
  node?: Maybe<InquiryType>;
};

export type InquiryType = Node & {
  __typename?: "InquiryType";
  comment: Scalars["String"];
  email: Scalars["String"];
  /** The ID of the object */
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createInquiry?: Maybe<CreateInquiryMutationPayload>;
  createUser?: Maybe<CreateUserMutation>;
  refreshToken?: Maybe<Refresh>;
  /** Obtain JSON Web Token mutation */
  tokenAuth?: Maybe<ObtainJsonWebToken>;
  verifyToken?: Maybe<Verify>;
};

export type MutationCreateInquiryArgs = {
  input: CreateInquiryMutationInput;
};

export type MutationCreateUserArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
  username: Scalars["String"];
};

export type MutationRefreshTokenArgs = {
  token?: InputMaybe<Scalars["String"]>;
};

export type MutationTokenAuthArgs = {
  password: Scalars["String"];
  username: Scalars["String"];
};

export type MutationVerifyTokenArgs = {
  token?: InputMaybe<Scalars["String"]>;
};

/** An object with an ID */
export type Node = {
  /** The ID of the object */
  id: Scalars["ID"];
};

/** Obtain JSON Web Token mutation */
export type ObtainJsonWebToken = {
  __typename?: "ObtainJSONWebToken";
  payload: Scalars["GenericScalar"];
  refreshExpiresIn: Scalars["Int"];
  token: Scalars["String"];
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename?: "PageInfo";
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars["String"]>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars["Boolean"];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars["Boolean"];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  authorized?: Maybe<Scalars["Boolean"]>;
  countries?: Maybe<CountriesType>;
  inquiries?: Maybe<InquiryConnection>;
  inquiry?: Maybe<InquiryType>;
  statistics?: Maybe<StatisticsType>;
  userSelf?: Maybe<UserType>;
};

export type QueryInquiriesArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

export type QueryInquiryArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryStatisticsArgs = {
  country: Scalars["String"];
};

export type Refresh = {
  __typename?: "Refresh";
  payload: Scalars["GenericScalar"];
  refreshExpiresIn: Scalars["Int"];
  token: Scalars["String"];
};

export type StatisticsType = {
  __typename?: "StatisticsType";
  activeCasesText: Scalars["String"];
  countryText: Scalars["String"];
  lastUpdate: Scalars["String"];
  newCasesText: Scalars["String"];
  newDeathsText: Scalars["String"];
  totalCasesText: Scalars["String"];
  totalDeathsText: Scalars["String"];
  totalRecoveredText: Scalars["String"];
};

export type UserType = {
  __typename?: "UserType";
  dateJoined: Scalars["DateTime"];
  email: Scalars["String"];
  firstName: Scalars["String"];
  id: Scalars["ID"];
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars["Boolean"];
  /** Designates whether the user can log into this admin site. */
  isStaff: Scalars["Boolean"];
  /** Designates that this user has all permissions without explicitly assigning them. */
  isSuperuser: Scalars["Boolean"];
  lastLogin?: Maybe<Scalars["DateTime"]>;
  lastName: Scalars["String"];
  password: Scalars["String"];
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars["String"];
};

export type Verify = {
  __typename?: "Verify";
  payload: Scalars["GenericScalar"];
};

export type CountriesQueryQueryVariables = Exact<{ [key: string]: never }>;

export type CountriesQueryQuery = {
  __typename?: "Query";
  countries?: {
    __typename?: "CountriesType";
    countries?: Array<string | null> | null;
  } | null;
};

export type StatisticsQueryQueryVariables = Exact<{
  country: Scalars["String"];
}>;

export type StatisticsQueryQuery = {
  __typename?: "Query";
  statistics?: {
    __typename?: "StatisticsType";
    activeCasesText: string;
    countryText: string;
    newCasesText: string;
    newDeathsText: string;
    totalCasesText: string;
    totalDeathsText: string;
    totalRecoveredText: string;
    lastUpdate: string;
  } | null;
};

export type CreateInquiryMutationMutationVariables = Exact<{
  name: Scalars["String"];
  email: Scalars["String"];
  comment: Scalars["String"];
}>;

export type CreateInquiryMutationMutation = {
  __typename?: "Mutation";
  createInquiry?: {
    __typename?: "CreateInquiryMutationPayload";
    inquiry?: {
      __typename?: "InquiryType";
      comment: string;
      email: string;
      name: string;
      id: string;
    } | null;
    errors: Array<{
      __typename?: "ErrorType";
      field: string;
      messages: Array<string>;
    }>;
  } | null;
};
