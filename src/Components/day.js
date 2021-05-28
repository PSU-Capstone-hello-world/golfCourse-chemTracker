import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../Styles/calendar.css";
import Backend from "../model/backend.js";

moment.locale("en-GB");

const localizer = momentLocalizer(moment);

class day extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <p>hello hello hello </p>
    );
  }
}

export default day;
