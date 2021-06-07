import Row from "react-bootstrap/Row";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import HomeCard from "./HomeCard";
import { BiCalendar } from "react-icons/bi";
import { AiFillFileAdd } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { GrTemplate } from "react-icons/gr";
import "./home.css";

function Home(props) {
  const [header] = useState([
    "calendarCard",
    "addCard",
    "SearchCard",
    "templatesCard",
  ]);
  const [icon] = useState([
    <BiCalendar size={60} />,
    <AiFillFileAdd size={60} />,
    <BsSearch size={60} />,
    <GrTemplate size={60} />,
  ]);
  const [title] = useState([
    "Calendar",
    "Add Form",
    "Search Form",
    "Templates",
  ]);
  const [link] = useState([
    "/Calendar",
    "/FormHome",
    "/Search_Form",
    "/Templates",
  ]);

  const [action] = useState([
    "see the calendar view",
    "add a form",
    "search a form",
    "add or edit a template",
  ]);

  return (
    <Container fluid className="mt-3 justify-content-between">
      <Row>
        <HomeCard
          header={header[0]}
          icon={icon[0]}
          title={title[0]}
          link={link[0]}
          action={action[0]}
        ></HomeCard>
        <HomeCard
          header={header[1]}
          icon={icon[1]}
          title={title[1]}
          link={link[1]}
          action={action[1]}
        ></HomeCard>
      </Row>
      <Row className="mt-5">
        <HomeCard
          header={header[2]}
          icon={icon[2]}
          title={title[2]}
          link={link[2]}
          action={action[2]}
        ></HomeCard>
        <HomeCard
          header={header[3]}
          icon={icon[3]}
          title={title[3]}
          link={link[3]}
          action={action[3]}
        ></HomeCard>
      </Row>
    </Container>
  );
}

export default Home;
