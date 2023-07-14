import json

import graphene
import requests

from covidsite.covidapi.graphql.type import StatisticsType


class StatisticsResolver(graphene.ObjectType):
    statistics = graphene.Field(StatisticsType, country=graphene.String(required=True))

    def resolve_statistics(self, info, country):
        """Retrieve statistics of a country registered at https://covid-19.dataflowkit.com/.

        Args:
            info (any): Django request object
            country (str): A country name to retrieve statistics for

        Raises:
            e: Raised if the request to the API fails
            Exception: Raised if the response from the API does not contain any data or attributes

        Returns:
            object: Retrieved inquiry
        """

        def get_value(attribute):
            """Get value of attribute from data.

            Args:
                attribute (str): Attribute to get value for

            Raises:
                Exception: Raised if the attribute is not found in data

            Returns:
                str: Value of attribute
            """
            if attribute in data:
                return data[attribute]
            raise Exception(f"Attribute {attribute} not found in data.")

        url = f"https://covid-19.dataflowkit.com/v1/{country}"
        try:
            response = requests.get(url)
            data = json.loads(response.text)
        except Exception as e:
            print(e)
            raise e
        else:
            if active_cases_text := get_value("Active Cases_text"):
                pass
            if country_text := get_value("Country_text"):
                pass
            if new_cases_text := get_value("New Cases_text"):
                pass
            if new_deaths_text := get_value("New Deaths_text"):
                pass
            if total_cases_text := get_value("Total Cases_text"):
                pass
            if total_deaths_text := get_value("Total Deaths_text"):
                pass
            if total_recovered_text := get_value("Total Recovered_text"):
                pass
            if last_update := get_value("Last Update"):
                pass
            if len(data.keys()) == 0:
                raise Exception("Something went wrong when retrieving countries. Ask developers to check logs.")
            return StatisticsType(
                active_cases_text=active_cases_text,
                country_text=country_text,
                new_cases_text=new_cases_text,
                new_deaths_text=new_deaths_text,
                total_cases_text=total_cases_text,
                total_deaths_text=total_deaths_text,
                total_recovered_text=total_recovered_text,
                last_update=last_update,
            )
