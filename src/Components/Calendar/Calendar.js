import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Container, Row, Col } from 'react-bootstrap';
import moment from "moment";
import Modalview from "../Modal";
import Backend from "../../model/backend.js";
// import Week from "./Week";
// import Day from "./Day";
import "./Calendar.css"
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("en-GB");

const localizer = momentLocalizer(moment);

class ChemCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth() + 1,
      dateString: "",
      document: "",
      showModal: false,
      cal_events: [
      ],
    };
  }

  async populateEvents() {
    const { dateString } = this.state;
    let backend = new Backend();

    let test = await backend.getByMonth(dateString);
    let response = test["Items"];
    let events = [response.length];

    for (let i = 0; i < response.length; i++) {
      let temp = {
        productName: response[i].productName,
        location: response[i].location,
        start: response[i].date,
        end: response[i].date,
        allDay: true,
        title: `Name: ${response[i].productName} | Location: ${response[i].location}`
      };

      events[i] = temp;
    }
    this.setState({
      cal_events: [...events],
    });
  }

  setDate() {
    const { selectedYear, selectedMonth } = this.state;
    if (selectedMonth < 10) {
      this.setState({ dateString: `${selectedYear}-0${selectedMonth}` }, () =>
        this.populateEvents()
      );
    } else {
      this.setState({ dateString: `${selectedYear}-${selectedMonth}` }, () =>
        this.populateEvents()
      );
    }
  }

  handleEventClick = async (event) => {
    const backend = new Backend();

    let document;
    if (
      event.startDate &&
      event.endDate &&
      event.productName &&
      event.location
    ) {
      document = await backend.getDateProductLocation(
        event.productName,
        event.location,
        event.startDate,
        event.endDate
      );
    } else if (
      event.startDate &&
      event.endDate &&
      event.productName &&
      !event.location
    ) {
      document = await backend.getDateProduct(
        event.startDate,
        event.endDate,
        event.productName
      );
    } else if (
      !event.productName &&
      event.startDate &&
      event.endDate &&
      event.location
    ) {
      document = await backend.getDateLocation(
        event.startDate,
        event.endDate,
        event.location
      );
    } else if (
      !event.startDate &&
      !event.endDate &&
      event.productName &&
      event.location
    ) {
      document = await backend.getNameLocation(
        event.productName,
        event.location
      );
    } else if (
      event.startDate &&
      event.endDate &&
      !event.productName &&
      !event.location
    ) {
      document = await backend.getDateRange(event.startDate, event.endDate);
    } else if (
      event.productName &&
      !event.startDate &&
      !event.endDate &&
      !event.location
    ) {
      document = await backend.getByName(event.productName);
    } else if (
      event.location &&
      !event.productName &&
      !event.startDate &&
      !event.endDate
    ) {
      document = await backend.getLocation(event.location);
    }

    if (document.Items[0]) {
      this.setState({ document: document.Items[0], showModal: true });
    }
  }

  componentDidMount() {
    this.setDate();
  }

  handleModal = (isOpen) => {
    this.setState({ showModal: isOpen });
  };

  onChange = (date) => {
    const { selectedMonth, selectedYear } = this.state;
    if (
      date.getMonth() !== selectedMonth &&
      date.getFullYear() !== selectedYear
    ) {
      this.setState(
        {
          selectedYear: date.getFullYear(),
          selectedMonth: date.getMonth() + 1,
        },
        () => this.setDate()
      );
    } else if (date.getMonth() + 1 !== selectedMonth) {
      this.setState({ selectedMonth: date.getMonth() + 1 }, () =>
        this.setDate()
      );
    } else if (date.getFullYear() !== selectedYear) {
      this.setState({ selectedYear: date.getFullYear() }, () => this.setDate());
    }
  };

  render() {
    const { cal_events, showModal, document } = this.state;

    if (showModal) {
      return (
        <Modalview
          formData={document}
          handleModal2={this.handleModal.bind(this)}
          isOpen={showModal}
        />
      )
    }

    return (
      <Container fluid className="calendarContainer">
        <Row>
            <Col>
            <div style={{ height: 700 }}>
              <Calendar
                onNavigate={this.onChange}
                localizer={localizer}
                events={cal_events}
                defaultView="month"
                views={{
                  month: true, 
                  week: true, 
                  day: true,
                }}
                onDoubleClickEvent={event => this.handleEventClick(event)}
                // components={{
                //   onDoubleClickEvent: (props) => { 
                //     // this.handleEventClick()
                //     alert("helllllllllllllo");
                //   }
                // }}
              />
            </div>
            </Col>
        </Row>
      </Container>
    );
  }
}

export default ChemCalendar;
