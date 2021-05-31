import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import React from "react";
import "./home.css";
import Link from "react-router-dom/Link";

function HomeCard(props) {
  return (
    <Col>
      <Card className={props.header}>
        <Card.Header as="h5">
          <Col>{props.icon}</Col>
          {props.title} Page Card
        </Card.Header>
        <Card.Body>
          <Card.Text>
            To {props.action} click {props.title} in the top navigation or click
            the {props.title} button
          </Card.Text>
          <Link to={props.link}>
            <Button variant="primary">Go to {props.title}</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default HomeCard;
