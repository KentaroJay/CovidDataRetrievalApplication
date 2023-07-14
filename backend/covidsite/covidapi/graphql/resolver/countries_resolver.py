import json

import graphene
import requests

from covidsite.covidapi.graphql.type import CountriesType


class CountriesResolver(graphene.ObjectType):
    countries = graphene.Field(CountriesType)

    def resolve_countries(self, info):
        """Retrieve all countries registered at https://covid-19.dataflowkit.com/.

        Args:
            info (any): Django request object

        Raises:
            e: Raised if the request to the API fails
            Exception: Raised if the response from the API does not contain any countries

        Returns:
            object: Retrieved inquiry
        """
        url = "https://covid-19.dataflowkit.com/v1"
        try:
            response = requests.get(url)
            data = json.loads(response.text)
        except Exception as e:
            print(e)
            raise e
        else:
            # Slicing the data to get only the countries.
            # Omitting items that does not have "Country_text" as a key
            # since the last item in the list does not contain a country.
            countries = [item["Country_text"] for item in data if "Country_text" in item]
            countries.sort()
            if len(countries) == 0:
                raise Exception("Something went wrong when retrieving countries. Ask developers to check logs.")
            return CountriesType(countries=countries)
