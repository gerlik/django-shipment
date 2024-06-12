import Login from "./login/Login";
import {useState} from "react";

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    return (
        <div className="App">
            <div className="container">
                {!token ?
                    <Login setToken={setToken}/>
                    :
                    <div>TODO shipments page</div>
                }
            </div>
        </div>
    );
}

export default App;
