import {useState} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {obtainToken} from "./Service";

const Login = ({setToken}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        try {
            const response = await obtainToken({username, password});
            setToken(response.data.access);
            localStorage.setItem('token', response.data.access);
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="login-card">
                <Card.Body>
                    <h3 className="mb-4">django-shipment</h3>
                    {error ? <div className="alert alert-danger">{error}</div> : ""}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} controlId="formUsername" className="mb-3">
                            <Form.Label column sm={3}>Username</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPassword" className="mb-3">
                            <Form.Label column sm={3}>Password</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                />
                            </Col>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Sign in
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;