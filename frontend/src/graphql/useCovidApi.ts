import { useLazyQuery, gql } from "@apollo/client";
import type {
  CountriesQueryQuery,
  StatisticsQueryQuery,
  StatisticsQueryQueryVariables,
} from "./graphql";

const countriesQuery = gql`
  query countriesQuery {
    countries {
      countries
    }
  }
`;

export const useFetchCountries = () => {
  const [fetchCountries, { data, loading, error }] =
    useLazyQuery<CountriesQueryQuery>(countriesQuery);
  return { fetchCountries, data, loading, error };
};

const statisticsQuery = gql`
  query statisticsQuery($country: String!) {
    statistics(country: $country) {
      activeCasesText
      countryText
      newCasesText
      newDeathsText
      totalCasesText
      totalDeathsText
      totalRecoveredText
      lastUpdate
    }
  }
`;

export const useFetchStatistics = (
  variables: StatisticsQueryQueryVariables
) => {
  const [fetchStatistics, { data, loading, error }] =
    useLazyQuery<StatisticsQueryQuery>(statisticsQuery, {
      variables,
    });
  return { fetchStatistics, data, loading, error };
};
