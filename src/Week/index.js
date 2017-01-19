import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { select, unselect, refresh } from './WeekActions';
import { doNTimes, getWeekdays } from '../utilities';
import Slot from './Slot';
import styles from './styles.scss';


export const Week = ({ slotsPerTime, timeDuration, times, startDate, league, affiliationId }) => {
  const weekdays = getWeekdays(startDate);

  // Generate the starting date, and the ending date.
  const weekDatesFormat = 'MMMM D, YYYY';
  const weekStartDay    = moment(startDate).weekday(0).format(weekDatesFormat);
  const weekEndDay      = moment(startDate).weekday(6).format(weekDatesFormat);

  // gets hours and seconds out of a time.
  const destructTime = (time) => {
    const matches = time.match(/(\d+):(\d+)\s*(am|pm)/i);
    console.log(matches);
    return {
      m: parseInt(matches[2]),
      h: (matches[3].toLowerCase() == 'pm' ? 12 + parseInt(matches[1]) : parseInt(matches[1]))
    };
  };
  
  // Time slots, contains destructed infor about the times.
  const destructedTimes = [
    destructTime(times.morning), destructTime(times.midday), destructTime(times.evening)
  ];

  // Renders the individual time slot.
  const renderTimeSlot = (time) => (n) => {
    const timeData = destructedTimes[time];
    const date = moment(startDate).weekday(0).add(n, 'days').minutes(timeData.m).hours(timeData.h);
      
    const slots = doNTimes(slotsPerTime)((i) => {
      return <Slot key={i}
                   index={i}
                   date={date.clone()}
                   time={time}
                   league={league}
                   affiliationId={affiliationId} />
    }); 
    
    return (
      <td key={n}>
        <div className={styles.slotsContainer}>
          {slots}
        </div>
      </td>
    )
  };
      
      return (
        <div>
          <span className={styles.title}>{weekStartDay} - {weekEndDay}</span>
          <table className={styles.container}>
            <tbody>
              <tr>
                <th></th>
                {weekdays.map((day, index) => {
                   return (
                     <th key={index}>
                       <div>
                         <span>{day.weekday}</span>
                         <span>{day.month} {day.date}</span>
                       </div>
                     </th>
                   )
                 })} 
              </tr>
              <tr>
                <th>{times.morning}</th>
                {doNTimes(7)(renderTimeSlot(0))}
              </tr>
              <tr>
                <th>{times.midday}</th>
                {doNTimes(7)(renderTimeSlot(1))}
              </tr>
              <tr>
                <th>{times.evening}</th>
                {doNTimes(7)(renderTimeSlot(2))}
              </tr>
            </tbody>
          </table>
        </div>
      ) 
}

let hasRefreshed = false;;

export const WeekContainer = ({ slotsPerTime, timeDuration, times, league, affiliationId, startDate, refresh, numbWeeks = 15 }) => {

  if (league && affiliationId && hasRefreshed !== league) {
    refresh({ type: league, affiliationId});
    hasRefreshed = league; 
  }

  const weeks = doNTimes(numbWeeks)((n) => {
    return (
      <Week slotsPerTime={slotsPerTime}
            timeDuration={timeDuration}
            times={times}
            league={league}
            startDate={moment(startDate).add(n, 'weeks')}
            affiliationId={affiliationId}
            key={n} />
    );
  });
  
  return (
    <div className={styles.weekContainer}>
      {weeks}
    </div>
  ); 
};

const mapStateToProps = (state) => {
  return {
    slotsPerTime: state.setup.slotsPerTime,
    timeDuration: state.setup.timeDuration,
    times: state.setup.times,
    league: state.league.current.id,
    affiliationId: state.setup.affiliationId,
    startDate: state.setup.startDate 
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    refresh: ({type, affiliationId}) => dispatch(refresh({ type, affiliationId }))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeekContainer);
