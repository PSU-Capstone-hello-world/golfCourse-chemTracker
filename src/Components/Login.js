import React, { useState } from 'react';
import {Container, Row, Button, Form} from 'react-bootstrap';
import '../Styles/Login.css';

function Login() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = event => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    }

    return (
        <Container id='containerLogin'>
            <Row className='justify-content-center align-self-center'>
                <Form id='login' validated={validated} onSubmit={handleSubmit}>
                    <div className='test d-flex justify-content-center'>
                        <h3>Sign In</h3>
                    </div>

                    <Form.Group controlId='formEmail'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' required placeholder='Enter email' />
                    </Form.Group>

                    <Form.Group controlId='formPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' required placeholder='Password' />
                    </Form.Group>

                    {/* will need to change the url for this once we have authentication up and going */}
                    <Button type='submit' formAction='/Home' variant='info' className='btn-block'>Submit</Button>
                </Form>
            </Row>
        </Container>
    )
}

export default Login;