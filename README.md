# django-shipment

A simple django REST API using Python, React, PostgreSQL and Docker.

## Prerequisites

1. Git
2. At least Python 3.9
3. Docker

## Instructions for local environment

### Setup

First 3 commands are necessary only on setup

1. Create the container ``docker-compose up --build``
2. Create admin ``python manage.py createsuperuser``
3. Update database ``python manage.py migrate``
4. In ``shipment-frontend`` folder run ``npm install``

### Run

5. Run ``python manage.py runserver``
6. In ``shipment-backend`` run ``npm start``

## Result

* Application will be accessible at ``http://localhost:3000/``
