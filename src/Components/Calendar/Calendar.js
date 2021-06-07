import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Container, Row, Col, Alert } from "react-bootstrap";
import moment from "moment";
import Modalview from "../Modal/Modal";
import Backend from "../../model/backend.js";
import "./Calendar.css";
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
      cal_events: [],
      selectedDate: null,
      selectedView: "month",
      minTime: new Date(),
      maxTime: new Date(),
      deleteAlert: false,
      redirectLocation: "",
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
        start: new Date(`${response[i].date} ${response[i].timeStart}`),
        end: new Date(`${response[i].date} ${response[i].timeEnd}`),
        // start: response[i].date,
        // end: response[i].date,
        // allDay: true,
        supplier: response[i].supplier,
        title: `${response[i].productName}`,
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

  eventStyleGetter = (event) => {
    const eventColor = this.stringToColour(event.productName, event.supplier);

    var style = {
      backgroundColor: eventColor,
      borderRadius: "10px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };

    return {
      style: style,
    };
  };

  stringToColour(str1, str2) {
    let hash = 0;

    if (str1.length === 0 && str2.length === 0) {
      return hash;
    }

    for (let i = 0; i < str1.length; i++) {
      let chr = str1.charCodeAt(i);
      hash = (hash << 3) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }

    for (let i = 0; i < str2.length; i++) {
      let chr = str2.charCodeAt(i);
      hash = (hash << 1) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }

    let colour = "#";
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xff;
      colour += ("00" + value.toString(16)).substr(-2);
    }

    return colour;
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
  };

  componentDidMount() {
    this.setDate();
  }

  handleModal = (isOpen) => {
    this.setState({ showModal: isOpen }, () => this.setDate());
  };

  onChange = (date) => {
    const { selectedMonth, selectedYear, selectedDate } = this.state;
    if (selectedDate != date) {
      this.setState(
        {
          selectedDate: date,
          selectedMonth: date.getMonth() + 1,
          selectedYear: date.getFullYear(),
        },
        () => this.setDate()
      );
    }
  };

  handleDeleteAlert = (status) => {
    this.setState({ deleteAlert: status, showModal: false }, () =>
      this.populateEvents()
    );
  };

  render() {
    const {
      cal_events,
      showModal,
      document,
      selectedDate,
      selectedView,
      minTime,
      maxTime,
      deleteAlert,
    } = this.state;
    minTime.setHours(7, 0, 0);
    maxTime.setHours(22, 0, 0);

    if (showModal) {
      return (
        <Modalview
          formData={document}
          handleModal2={this.handleModal.bind(this)}
          handleDeleteAlert={this.handleDeleteAlert.bind(this)}
          isOpen={showModal}
          redirectLocation="/Calendar"
        />
      );
    }

    return (
      <Container fluid className="calendarContainer">
        <Row>
          <div
            //style={deleteAlert ? { display: "flex" } : { display: "none" }}
            //hidden={!deleteAlert}
            className="d-flex fixed-top justify-content-center"
          >
            <Alert
              variant="danger"
              dismissible
              onClose={() =>
                this.setState({ deleteAlert: false, disabled: false })
              }
              hidden={!deleteAlert}
              className="fade-out w-50 h-10"
            >
              Form Has Been Deleted
            </Alert>
          </div>
          <Col>
            <div style={{ height: 1100 }}>
              <Calendar
                className="m-3"
                onNavigate={this.onChange}
                localizer={localizer}
                events={cal_events}
                defaultView={selectedView}
                onView={(view) => this.setState({ selectedView: view })}
                views={{
                  month: true,
                  week: true,
                  day: true,
                }}
                min={minTime}
                max={maxTime}
                onDoubleClickEvent={(event) => this.handleEventClick(event)}
                eventPropGetter={this.eventStyleGetter}
                defaultDate={selectedDate ? selectedDate : new Date()}
              />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ChemCalendar;
