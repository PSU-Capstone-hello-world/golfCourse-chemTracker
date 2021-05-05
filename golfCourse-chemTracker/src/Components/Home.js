import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import React from "react";

function Home(props){
    return(
        <Card>
            <Card.Header as="h5">Home Page</Card.Header>
            <Card.Body>
                <Card.Title>Welcome to the home page</Card.Title>
                <Card.Text>
                    To search for a chemical go to either calendar view or search view
                </Card.Text>
                <Row>
                    <Col></Col>
                    <Col><Button variant="primary">Go somewhere</Button></Col>
                    <Col></Col>
                </Row>
            </Card.Body>
        </Card>

    );
}

export default Home;