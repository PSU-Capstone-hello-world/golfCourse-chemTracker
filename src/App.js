import Navigation from './Components/Navigation';
import React, { useState } from "react";
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Components/Login';
import useToken from './useToken';
// import './App.css';

function App() {
    const { token, setToken } = useToken();


    if (!token) {
        return <Login setToken={setToken} />
    }

    return (
        <div className="App">
            <header className="App-header">
                <Navigation></Navigation>
            </header>
        </div>
    );
}

export default App;