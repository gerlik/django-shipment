import Login from "./login/Login";
import {useState} from "react";
import {Shipments} from "./shipments/Shipments";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import {ShipmentDetails} from "./shipments/ShipmentDetails";
import Container from "react-bootstrap/Container";


function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <Router>
            <div className="App">
                {!token ? (
                    <Login setToken={setToken}/>
                ) : (
                    <Container>
                        <div className={"d-flex justify-content-end pt-2 pe-3"}>
                            <Link onClick={handleLogout} to={"/"} className={""}>
                                Logout
                            </Link>
                        </div>

                        <Routes>
                            <Route path="/shipment/:id" element={<ShipmentDetails token={token}/>}/>
                            <Route path="/" element={<Shipments token={token}/>}/>
                        </Routes>
                    </Container>
                )}
            </div>
        </Router>
    );
}

export default App;
