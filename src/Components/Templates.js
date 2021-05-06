import React from "react";
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
// import NewTemplate from "./NewTemplate";
import "./Template.css"

class Templates extends React.Component {
    render() {
        return (
        <Container fluid>
            <Row>
                <Col>
                    <Card className="myCard" style={{ width: '15rem' }}>
                        <Card.Img variant="top" src="https://img.icons8.com/carbon-copy/200/000000/add-rule.png" />
                        <Card.Body>
                            <Card.Title>Create New Template</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="myCard" style={{ width: '15rem' }}>
                        <Card.Img variant="top" src="https://img.icons8.com/carbon-copy/200/000000/edit-property.png" />
                        <Card.Body>
                            <Card.Title>Edit Existing Template</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        )
    }
}

export default Templates;