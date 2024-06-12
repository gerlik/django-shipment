import Login from "./login/Login";
import {useState} from "react";
import {Shipments} from "./shipments/Shipments";

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    return (
        <div className="App">
            <div className="container">
                {!token ?
                    <Login setToken={setToken}/>
                    :
                    <Shipments token={token}/>
                }
            </div>
        </div>
    );
}

export default App;
