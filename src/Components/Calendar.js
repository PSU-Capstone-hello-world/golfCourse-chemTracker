import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

function MyCalendar() {

    const [date, setDate] = useState(new Date());

    const onDateChange = (newDate) => {
        setDate(newDate);
        console.log("devon date: " + newDate);
    }

    return (
        <Calendar
            onChange={onDateChange}
            value={date}
            showNeighboringMonth={false}
            locale={"en-US"}
        />
    );
}

ReactDOM.render(
    <MyCalendar />,
    document.getElementById('root')
);

export default MyCalendar;