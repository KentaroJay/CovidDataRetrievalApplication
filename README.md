- [Project Description](#project-description)
- [Tech Stacks](#tech-stacks)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Architecture](#architecture)
- [How to run](#how-to-run)


# Project Description

This is a project for retrieving third party public api on https://covid-19.dataflowkit.com/

# Tech Stacks

## Backend

![Backend](backend.png)

- Python
- Django
- GraphQL

Detail descriptions are written in [Here](backend/README.md)

## Frontend

![Frontend](frontend.png)

- React
- TypeScript
- Material UI

Detail descriptions are written in [Here](frontend/README.md)

# Architecture
![Architecture](architecture.png)

# How to run

- Clone this repository.
- At the top of the repository(where docker-compose.yml is), run `docker compose up`
- This takes a while to start the application since it runs `npm install` on the first run.
- When it's over, go to `localhost:3000`.