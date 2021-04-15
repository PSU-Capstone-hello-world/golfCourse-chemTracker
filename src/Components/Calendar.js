import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-dates/initialize';
//import Calendar from 'react-calendar-pane';
import moment, { calendarFormat } from 'moment';
import date from 'react-calendar';

class Example extends React.Component {
    constructor(){
        super();
        this.state={
            selectedDate:moment(),
        }
    }
    onSelect=(e)=>{
        this.setState({selectedDate:e})
    }
    render () {
        return(
            <div>
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <p> The date you've selected is: {this.state.selectedDate.format('YYYY-MM-DD')} </p>
                    <Calendar date={moment("23/10/2015", "DD/MM/YYYY")} onSelect={this.onSelect} />
                </div>

            </div>
        )
    }
}

export default Example;