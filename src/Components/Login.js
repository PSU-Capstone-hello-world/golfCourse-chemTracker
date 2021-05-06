import React, { useState } from 'react';
import {Container, Row, Button, Form} from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../Styles/Login.css';


async function loginUser(credentials) {
    return await fetch(`https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/names?name=${credentials.username}&details=${credentials.password}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        },
        // body: JSON.stringify(credentials)
    })
    .then(data => data.json())
    .catch(error => {
        alert(`Error occured: ${error}`);
    })
}

export default function Login( { setToken }) {
    const [validated, setValidated] = useState(false);
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async event => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        const token = await loginUser({
            username,
            password
        });

        if (token) {
            setValidated(true);
            setToken(token);
        } else {
            alert("Failed to login");
        }
    }

    return (
        <Container id='containerLogin'>
            <Row className='justify-content-center align-self-center'>
                <Form id='loginForm' validated={validated} onSubmit={handleSubmit} preventDefault>
                    <div className='test d-flex justify-content-center'>
                        <h3>Log in</h3>
                    </div>

                    <Form.Group controlId='formEmail'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' required onChange={e => setUserName(e.target.value)} placeholder='Enter email' />
                    </Form.Group>

                    <Form.Group controlId='formPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' required placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>

                    <Button type='submit' variant='info' className='btn-block'>Submit</Button>
                </Form>
            </Row>
        </Container>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}