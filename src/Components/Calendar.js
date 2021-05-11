import React, { Component } from 'react';

import {Calendar, momentLocalizer  } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import axios from 'axios'

import "react-big-calendar/lib/css/react-big-calendar.css";
import '../Styles/calendar.css';

import Backend from "../model/backend.js";

//Calendar.momentLocalizer(moment);

moment.locale('en-GB');


const localizer = momentLocalizer(moment)

class ChemCalendar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      cal_events: [
        //State is updated via componentDidMount
      ],
    }

  }

  convertDate = (date) => {
    return moment.utc(date).toDate()
  }

async componentDidMount() {
let backend = new Backend()
let test = await backend.getByMonth('2021-05-01')



    // axios.get('https://api.github.com/users/mapbox')
    //   .then(response => {
    //     console.log(response.data);
    //     let appointments = response.data;
        
    //     for (let i = 0; i < appointments.length; i++) {
    //       appointments[i].start = this.convertDate(appointments[i].start)
    //       appointments[i].end = this.convertDate(appointments[i].end)
    //     }

    //     this.setState({
    //       cal_events:[...appointments]
    //     })
  
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }


  render() {

    const { cal_events } = this.state

    return (
      <div className="Calendar">
        <header className="calendar-header">
          <h1 className=".calendar-title">React Calendar</h1>
        </header>
        <div style={{ height: 700 }}>
          <Calendar
            localizer={localizer}
            events={cal_events}
            step={30}
            defaultView='week'
            views={['month','week','day']}
            defaultDate={new Date()}
          />
        </div>
      </div>
    );
  }
}

export default ChemCalendar;
