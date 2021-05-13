import React from "react";
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import "./Template.css"

class Templates extends React.Component {
    render() {
        return (
        <Container fluid>
            <Row>
                <Col>
                    <a href="/createTemplate">
                        <Card className="templateCard" style={{ position: 'absolute' }}>
                            <Card.Img variant="top" src="https://img.icons8.com/carbon-copy/200/000000/add-rule.png" />
                            <Card.Body>
                                <Card.Title>Create New Template</Card.Title>
                            </Card.Body>
                        </Card>
                    </a>
                </Col>
                <Col>
                    <a href="/editTemplate">
                        <Card className="templateCard" style={{ position: 'absolute' }}>
                            <Card.Img variant="top" src="https://img.icons8.com/carbon-copy/200/000000/edit-property.png" />
                            <Card.Body>
                                <Card.Title>Edit Existing Template</Card.Title>
                            </Card.Body>
                        </Card>
                    </a>
                </Col>
            </Row>
        </Container>
        )
    }
}

export default Templates;