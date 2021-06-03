import Navigation from './Components/Navigation/Navigation';
import Home from './Components/Home/Home';
import React, { useState } from "react";
import Login from './Components/Login/Login';
import useToken from './useToken';

function App() {
    const { token, setToken } = useToken();


    if (!token) {
        return <Login setToken={setToken} />
    }

    return (
        <div className="App">
            <header className="App-header">
                <Navigation>
                    <Home />
                </Navigation>
            </header>
        </div>
    );
}

export default App;