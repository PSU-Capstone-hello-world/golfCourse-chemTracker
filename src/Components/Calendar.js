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

class ChemCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateString: '',
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth()+1,
      cal_events: [
        //State is updated via componentDidMount
      ],
    };
  }

  getDate = () => {
    const {selectedYear, selectedMonth} = this.state;
    if(selectedMonth < 10){
      this.setState({dateString:`${selectedYear}-0${selectedMonth}`});
    }
    else{
      this.setState({dateString:`${selectedYear}-${selectedMonth}`});
    }
  }

  async populateEvents() {
    const {dateString} = this.state;
    let backend = new Backend();
    this.getDate();
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
        title: response[i].productName + " " + response[i].location,
      };

      events[i] = temp;
    }
    this.setState({
      cal_events: [...events],
    });
  }

  async componentDidMount() {
    let something = new Date();
    this.setState({selectedDate: something.getMonth(), selectedYear: something.getFullYear()})
  }

  componentDidUpdate() {
    //this.populateEvents();
  }

  onChange = (date) => { 
    this.setState({ selectedMonth: date.getMonth() }) 
  };

  render() {
    const { cal_events, selectedMonth, dateString } = this.state;
    console.log(dateString);
    return (
      <div className="Calendar">
        <header className="calendar-header">
          <h1 className=".calendar-title">Calendar</h1>
        </header>
        <div style={{ height: 700 }}>
          <Calendar
            onChange={this.onChange}
            localizer={localizer}
            events={cal_events}
            defaultView="month"
            views={["month", "week", "day"]}
            defaultDate={new Date()}
          />
        </div>
      </div>
    );
  }
}

export default ChemCalendar;
