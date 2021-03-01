import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


function CalendarView(){
    const [value,onChange] = useState(new Date());
    return (
        <div>
          <h2 className={"title"}>Calendar</h2>
            <Calendar onChange={onChange} value={value}/>
        </div>
    );
}

export default CalendarView;