import moment from 'moment';

// Utility function that does something n times.
// The function is curried and gives an array of responses.
export const doNTimes = (n) => (func) => {
  let responses = [];
  let index = 0;
  while (index < n) {
    responses.push(func(index++));
  }
  return responses;
};


// Returns a list of objects, each containing the day of the month, `date`
// the weekday, `weekday` and an abreviated weekday, `abrev`.
// The start day should be the start of the week, but is not required to
// be.
export const getWeekdays = (startDate = new Date()) => {
  let weekDayStep = moment(startDate).clone(); 
  let weekDays = []; 

  for (let i = 0; i < 7; i++ ) {
    weekDayStep = weekDayStep.weekday(i);
    weekDays.push({
      date: weekDayStep.date(),
      weekday: weekDayStep.format('dddd'),
      abrev: weekDayStep.format('ddd'),
      month: weekDayStep.format('MMM')
    });
  }
  return weekDays; 
};


