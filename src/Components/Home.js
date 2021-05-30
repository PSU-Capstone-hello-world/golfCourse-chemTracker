import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import "./home.css";
import { Container } from "react-bootstrap";
import Link from "react-router-dom/Link";
import HomeCard from "../Components/HomeCard";
import { useTheme } from "@material-ui/core";

function Home(props) {
  const [header, setHeader] = useState([
    "calendarCard",
    "addCard",
    "SearchCard",
    "templatesCard",
  ]);
  const [title, setTitle] = useState([
    "Calendar",
    "Add Form",
    "Search Form",
    "Templates",
  ]);
  const [link, setLink] = useState([
    "/Calendar",
    "/FormHome",
    "/Search_Form",
    "/Templates",
  ]);
  const [description, setDescription] = useState([""]);

  const [action, setAction] = useState([
    "see the calendar view",
    "add a form",
    "search a form",
    "add or edit a template",
  ]);

  return (
    <Container fluid className="mt-5 justify-content-between">
      <Row>
        <HomeCard
          header={header[0]}
          title={title[0]}
          link={link[0]}
          action={action[0]}
        ></HomeCard>
        <HomeCard
          header={header[1]}
          title={title[1]}
          link={link[1]}
          action={action[1]}
        ></HomeCard>
      </Row>
      <Row className="mt-5">
        <HomeCard
          header={header[2]}
          title={title[2]}
          link={link[2]}
          action={action[2]}
        ></HomeCard>
        <HomeCard
          header={header[3]}
          title={title[3]}
          link={link[3]}
          action={action[3]}
        ></HomeCard>
      </Row>
    </Container>
  );
}

export default Home;
