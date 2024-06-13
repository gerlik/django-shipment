import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useParams} from 'react-router-dom';
import {updateShipment} from "../Service";

export const ShipmentDetails = ({token}) => {
    const {id} = useParams();
    const [shipment, setShipment] = useState({
        tracking_number: '',
        origin: '',
        destination: '',
        status: '',
        estimated_delivery: ''
    });
    const [error, setError] = useState("");
    // const navigate = useNavigate();

    useEffect(() => {
        const fetchShipment = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/shipments/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setShipment(response.data);
            } catch (error) {
                console.error('Error fetching shipment: ', error);
                setError(`Error fetching shipment: ${error}`);
            }
        };

        fetchShipment();
    }, [id, token]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await updateShipment(id, shipment, token);
            // navigate('/');  // Redirect to shipments list after update, don't know if that is reasonable
        } catch (error) {
            console.error(error);
            if (error?.response?.data) {
                const errorDetails = error.response.data;
                let errorMessage = 'Error updating shipment: ';
                for (const [key, value] of Object.entries(errorDetails)) {
                    errorMessage += `${key}: ${value} `;
                }
                setError(errorMessage);
            } else {
                setError(`Error updating shipment: ${error.message}`);
            }
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setShipment(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    if (!shipment) {
        return <Container className={"pt-5 pb-5"}>No shipment.</Container>;
    }

    return (
        <Container className={"pt-5 pb-5"}>
            {error ? <div className="alert alert-danger">{error}</div> : ""}
            <h2>Shipment Details</h2>
            <Form onSubmit={handleUpdate}>
                <Form.Group>
                    <Form.Label>Tracking Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="tracking_number"
                        value={shipment.tracking_number}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Origin</Form.Label>
                    <Form.Control
                        type="text"
                        name="origin"
                        value={shipment.origin}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Destination</Form.Label>
                    <Form.Control
                        type="text"
                        name="destination"
                        value={shipment.destination}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                        name="status"
                        value={shipment.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Status</option>
                        <option value="Pending">Pending</option>
                        <option value="In transit">In transit</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Delayed">Delayed</option>
                        <option value="Returned">Returned</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Estimated Delivery</Form.Label>
                    <Form.Control
                        type="date"
                        name="estimated_delivery"
                        value={shipment.estimated_delivery}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <br/>
                <Button type="submit" variant="warning" className="me-2">
                    Update
                </Button>
            </Form>
        </Container>
    );
}
