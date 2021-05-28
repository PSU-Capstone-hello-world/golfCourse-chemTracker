import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Card, Container, Row, Col } from 'react-bootstrap';
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import "../Styles/calendar.css";
import Backend from "../../model/backend.js";

import Day from '../day.js';
import "./Calendar.css"

moment.locale("en-GB");

const localizer = momentLocalizer(moment);

class ChemCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth() + 1,
      dateString: "",
      cal_events: [
        //State is updated via componentDidMount
      ],
    };
  }

  async populateEvents() {
    const { dateString } = this.state;
    let backend = new Backend();
    // if(selectedMonth < 10){
    //   this.setState({dateString:`${selectedYear}-0${selectedMonth}`});
    //   return `${selectedYear}-0${selectedMonth}`;
    // }
    // else{
    //   this.setState({dateString:`${selectedYear}-${selectedMonth}`});
    // }
    let test = await backend.getByMonth(dateString);
    let response = test["Items"];
    let events = [response.length];

    for (let i = 0; i < response.length; i++) {
      let temp = {
        productName: response[i].productName,
        location: response[i].location,
        start: response[i].date,
        end: response[i].date,
        name: "test product",
        allDay: true,
        title:
          "Product name: " +
          response[i].productName +
          "\n" +
          " Location: " +
          response[i].location,
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

  componentDidMount() {
    this.setDate();
    // const {selectedYear, selectedMonth} = this.state;
    //   if(selectedMonth < 10){
    //     this.setState({dateString:`${selectedYear}-0${selectedMonth}`}, () => this.populateEvents());
    //   }
    //   else{
    //     this.setState({dateString:`${selectedYear}-${selectedMonth}`}, () => this.populateEvents());
    //   }
  }

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
    const { cal_events, selectedMonth, dateString } = this.state;
    return (
      <Container fluid className="calendarContainer">
        <Row>
          {/* <div className="Calendar"> */}
            {/* <header className="calendar-header">
              <h1 className=".calendar-title">Calendar</h1>
            </header> */}
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
                components={{
                  month: {
                    event: (props) => {
                      return <div className="dateTest"></div>
                    }
                  },
                  week: {
                    event: (props) => {
                      return <div className="dateTest"></div>
                    }
                  },
                  day: {
                    event: (props) => {
                      return <div className="dateTest"></div>
                    }
                  }
                }}
                // eventPropGetter={this.eventStyleGetter}
                // eventPropGetter={(event, start, end, isSelected) => {
                  // let newStyle = {
                  //   backgroundColor: "lightgrey",
                  //   color: "white",
                  //   borderRadius: "5px",
                  //   border: "none",
                  // };
                  // if (event.location === 'tees') {
                  //   newStyle.backgroundColor = "blue";
                  // } else if (event.symptoms === 'fairways') {
                  //   newStyle.backgroundColor = "grey";
                  // } else {
                  //   newStyle.backgroundColor = "blue";
                  // }
                  // return {
                  //   className: "",
                  //   style: newStyle,
                  // };
                // }}
              />
            </div>
            </Col>
          {/* </div> */}
        </Row>
      </Container>
    );
  }
}

export default ChemCalendar;
