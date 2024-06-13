import {useEffect, useState} from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Container";
import {createShipment, deleteShipment, getShipments} from "../Service";
import {Link} from "react-router-dom";

export const Shipments = ({token}) => {
    const [shipments, setShipments] = useState([]);
    const [newShipment, setNewShipment] = useState({
        tracking_number: '',
        origin: '',
        destination: '',
        status: '',
        estimated_delivery: ''
    });
    const [error, setError] = useState("");

    useEffect(() => {
        fetchShipments();
        // eslint-disable-next-line
    }, []);

    const fetchShipments = async () => {

        try {
            const response = await getShipments(token);
            setShipments(response.data);
        } catch (error) {
            console.error(error)
            setError(`Error fetching shipments: ${error}`)
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setError("")
        try {
            await createShipment(newShipment, token);
            fetchShipments();
        } catch (error) {
            if (error?.response?.data) {
                const errorDetails = error.response.data;
                let errorMessage = 'Error creating shipment: ';
                for (const [key, value] of Object.entries(errorDetails)) {
                    errorMessage += `${key}: ${value} `;
                }
                setError(errorMessage);
            } else {
                setError(`Error creating shipment: ${error.message}`);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteShipment(id, token);
            fetchShipments();
        } catch (error) {
            console.error(error)
            setError(`Error deleting shipments: ${error}`)
        }
    };

    return (
        <Container className={"pt-5 pb-5"}>
            {error ? <div className="alert alert-danger">{error}</div> : ""}
            <h3>Add New Shipment</h3>
            <Form>
                <Form.Group>
                    <Form.Label>Tracking Number</Form.Label>
                    <Form.Control
                        type="text"
                        value={newShipment.tracking_number}
                        onChange={(e) => setNewShipment({...newShipment, tracking_number: e.target.value})}
                        placeholder="Tracking Number"
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Origin</Form.Label>
                    <Form.Control
                        type="text"
                        value={newShipment.origin}
                        onChange={(e) => setNewShipment({...newShipment, origin: e.target.value})}
                        placeholder="Origin"
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Destination</Form.Label>
                    <Form.Control
                        type="text"
                        value={newShipment.destination}
                        onChange={(e) => setNewShipment({...newShipment, destination: e.target.value})}
                        placeholder="Destination"
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                        value={newShipment.status}
                        onChange={(e) => setNewShipment({...newShipment, status: e.target.value})}
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
                        value={newShipment.estimated_delivery}
                        onChange={(e) => setNewShipment({...newShipment, estimated_delivery: e.target.value})}
                        placeholder="Estimated Delivery"
                        required
                    />
                </Form.Group>
                <br/>
                <Button type={"submit"} onClick={handleCreate}>Add Shipment</Button>
            </Form>
            <hr className="hr"/>
            <h3>Shipment List</h3>
            {
                shipments?.length > 0 ?
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Tracking Number</th>
                            <th>Origin</th>
                            <th>Destination</th>
                            <th>Status</th>
                            <th>Estimated Delivery</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {shipments.map(shipment => (
                            <tr key={shipment.id}>
                                <td><Link to={`/shipment/${shipment.id}`}>{shipment.tracking_number}</Link></td>
                                <td>{shipment.origin}</td>
                                <td>{shipment.destination}</td>
                                <td><Badge bg={"primary"}>{shipment.status}</Badge></td>
                                <td>{shipment.estimated_delivery}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDelete(shipment.id)} size={"sm"}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table> : "No shipments yet, add one below."
            }
        </Container>
    )
        ;
}