FROM python:3.11.4

RUN apt-get update -y && apt-get dist-upgrade -y && \
    apt-get install -y build-essential graphviz-dev graphviz pkg-config

ENV PYTHONUNBUFFERED 1
WORKDIR /backend
ADD requirements.lock /backend/
RUN pip install -r requirements.lock
