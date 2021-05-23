import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import "./Templates/Templates.css";

class FormHome extends React.Component {
  render() {
    return (
      <Container fluid>
        <h1>Add New Form</h1>
        <Row>
          <Col>
            <a href="/Add_Form">
              <Card className="templateCard" style={{ position: "absolute" }}>
                <Card.Img
                  variant="top"
                  style={{ width: "80%", margin: "auto", paddingTop: "25px" }}
                  src="https://img.icons8.com/ios/200/000000/add-file.png"
                />
                <Card.Body>
                  <Card.Title>Add New Form from Scratch</Card.Title>
                </Card.Body>
              </Card>
            </a>
          </Col>
          <Col>
            <a href="/Templates">
              <Card className="templateCard" style={{ position: "absolute" }}>
                <Card.Img
                  variant="top"
                  style={{ width: "80%", margin: "auto", paddingTop: "25px" }}
                  src="https://img.icons8.com/ios/200/000000/new-by-copy--v1.png"
                />
                <Card.Body>
                  <Card.Title>Add New Form from Template</Card.Title>
                </Card.Body>
              </Card>
            </a>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default FormHome;
