import pytest
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken

from shipment.models import Shipment
from django.contrib.auth.models import User


@pytest.fixture
def api_client():
    return APIClient()


@pytest.mark.django_db
def test_token_obtain(api_client):
    user = User.objects.create_user(username='testuser', password='testpassword')
    url = reverse('token_obtain_pair')
    data = {'username': 'testuser', 'password': 'testpassword'}
    response = api_client.post(url, data, format='json')
    assert response.status_code == 200
    assert 'access' in response.data


@pytest.mark.django_db
def test_token_refresh(api_client):
    user = User.objects.create_user(username='testuser', password='testpassword')
    refresh = RefreshToken.for_user(user)
    url = reverse('token_refresh')
    data = {'refresh': str(refresh)}
    response = api_client.post(url, data, format='json')
    assert response.status_code == 200
    assert 'access' in response.data


@pytest.fixture
def authenticated_api_client():
    user = User.objects.create_user(username='testuser', password='testpassword')
    client = APIClient()
    client.force_authenticate(user=user)
    return client


@pytest.mark.django_db
def test_list_shipments(authenticated_api_client):
    url = reverse('shipment-list')
    response = authenticated_api_client.get(url)
    assert response.status_code == status.HTTP_200_OK


@pytest.mark.django_db
def test_create_shipment_missing_field(authenticated_api_client):
    url = reverse('shipment-list')
    # missing field test
    data = {
        'tracking_number': '1234567890',
        'origin': '',
        'destination': 'Los Angeles',
        'status': '',
        'estimated_delivery': '2024-12-31'
    }
    response = authenticated_api_client.post(url, data, format='json')
    assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
def test_create_shipment(authenticated_api_client):
    url = reverse('shipment-list')
    data = {
        'tracking_number': '1234567890',
        'origin': 'New York',
        'destination': 'Los Angeles',
        'status': 'In Transit',
        'estimated_delivery': '2024-12-31'
    }
    response = authenticated_api_client.post(url, data, format='json')
    assert response.status_code == status.HTTP_201_CREATED


@pytest.mark.django_db
def test_create_double_shipment(authenticated_api_client):
    url = reverse('shipment-list')
    data = {
        'tracking_number': '1234567890',
        'origin': 'New York',
        'destination': 'Los Angeles',
        'status': 'In Transit',
        'estimated_delivery': '2024-12-31'
    }
    response = authenticated_api_client.post(url, data, format='json')
    assert response.status_code == status.HTTP_201_CREATED

    # try to add another with same tracking number
    data = {
        'tracking_number': '1234567890',
        'origin': 'Tartu',
        'destination': 'Tallinn',
        'status': 'In Transit',
        'estimated_delivery': '2024-12-31'
    }
    response = authenticated_api_client.post(url, data, format='json')
    assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
def test_retrieve_shipment(authenticated_api_client):
    shipment = Shipment.objects.create(
        tracking_number='1234567890',
        origin='New York',
        destination='Los Angeles',
        status='In Transit',
        estimated_delivery='2024-12-31'
    )
    url = reverse('shipment-detail', args=[shipment.id])
    response = authenticated_api_client.get(url)
    assert response.status_code == status.HTTP_200_OK


@pytest.mark.django_db
def test_update_shipment(authenticated_api_client):
    shipment = Shipment.objects.create(
        tracking_number='1234567890',
        origin='New York',
        destination='Los Angeles',
        status='In Transit',
        estimated_delivery='2024-12-31'
    )
    url = reverse('shipment-detail', args=[shipment.id])
    data = {'status': 'Delivered'}
    response = authenticated_api_client.patch(url, data, format='json')
    assert response.status_code == status.HTTP_200_OK
    shipment.refresh_from_db()
    assert shipment.status == 'Delivered'


@pytest.mark.django_db
def test_delete_shipment(authenticated_api_client):
    shipment = Shipment.objects.create(
        tracking_number='1234567890',
        origin='New York',
        destination='Los Angeles',
        status='In Transit',
        estimated_delivery='2024-12-31'
    )
    url = reverse('shipment-detail', args=[shipment.id])
    response = authenticated_api_client.delete(url)
    assert response.status_code == status.HTTP_204_NO_CONTENT
