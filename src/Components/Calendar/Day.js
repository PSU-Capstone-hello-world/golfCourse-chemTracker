import React from 'react'
import * as dates from 'date-arithmetic'
// import events from '../events'
import { Navigate } from 'react-big-calendar'
import TimeGrid from 'react-big-calendar/lib/TimeGrid'
// import ExampleControlSlot from '../ExampleControlSlot'

class MyDay extends React.Component {
    render() {
        return (
            <h1>Day View: Under Construction!</h1>
        )
    //   let { date } = this.props
    // //   let range = MyWeek.range(date)
  
    //   return <TimeGrid {...this.props} range={range} eventOffset={15} />
    }
  }
  
//   MyWeek.range = date => {
//     let start = date
//     let end = dates.add(start, 2, 'day')
  
//     let current = start
//     let range = []
  
//     while (dates.lte(current, end, 'day')) {
//       range.push(current)
//       current = dates.add(current, 1, 'day')
//     }
  
//     return range
//   }
  
  MyDay.navigate = (date, action) => {
    switch (action) {
      case Navigate.PREVIOUS:
          alert("go back");
        // return dates.add(date, -3, 'day')
  
      case Navigate.NEXT:
          alert("go forward");
        // return dates.add(date, 3, 'day')
  
      default:
        return date
    }
  }
  
  MyDay.title = date => {
    return `My custom week: ${date.toLocaleDateString()}`
  }
  
//   let CustomView = ({ localizer }) => (
//     <React.Fragment>
//       <ExampleControlSlot.Entry waitForOutlet>
//         <strong>The Calendar below implments a custom 3-day week view</strong>
//       </ExampleControlSlot.Entry>
//       <Calendar
//         events={events}
//         localizer={localizer}
//         defaultView={Views.WEEK}
//         defaultDate={new Date(2015, 3, 1)}
//         views={{ month: true, week: MyWeek }}
//       />
//     </React.Fragment>
//   )


export default MyDay;