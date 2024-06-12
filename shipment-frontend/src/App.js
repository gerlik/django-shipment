import Login from "./login/Login";
import {useState} from "react";
import {Shipments} from "./shipments/Shipments";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ShipmentDetails} from "./shipments/ShipmentDetails";


function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    return (
        <Router>
            <div className="App">
                {!token ? (
                    <Login setToken={setToken}/>
                ) : (
                    <Routes>
                        <Route path="/shipment/:id" element={<ShipmentDetails token={token}/>}/>
                        <Route path="/" element={<Shipments token={token}/>}/>
                    </Routes>
                )}
            </div>
        </Router>
    );
}

export default App;
