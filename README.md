# django-shipment

A simple django REST API using Python, React, PostgreSQL and Docker.

## Prerequisites

1. Git
2. At least Python 3.9
3. Docker

## Instructions for local environment

### Setup

First 3 commands are neccessary only on setup

1. Create the container ``docker-compose up --build``
2. Create admin ``python manage.py createsuperuser``
3. In ``shipment-frontend`` folder run ``npm install``

### Run

4. Run ``python manage.py runserver``
5. In ``shipment-backend`` run ``npm start``

## Result

* Applicaiton will be accessible at ``http://localhost:3000/``
