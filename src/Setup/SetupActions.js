import Api from '../Api';
import moment from 'moment';

export const SETUP_UPDATE_FIELD = 'SETUP_UPDATE_FIELD';
export const SETUP_UPDATE_TIME_FIELD = 'SETUP_UPDATE_TIME_FIELD';

// If time is passed as true, it will update the nested field within time.
export const update = ({ name, value, time = false }) => {
  if ( time ) {
    return {
      type: SETUP_UPDATE_TIME_FIELD,
      name,
      value
    }
  }
  return {
    type: SETUP_UPDATE_FIELD,
    name, 
    value
  }
};

export const SETUP_GET_START    = 'SETUP_GET_START';
export const SETUP_GET_FAIL     = 'SETUP_GET_FAIL';
export const SETUP_GET_COMPLETE = 'SETUP_GET_COMPLETE';


// Gets information for the setup wih respect to the current league.  RGS - Shouldn't url: also have affiliationId  ?
export const getData = (type) => {
  return (dispatch) => {
    dispatch({ type: SETUP_GET_START });
    return Api({
      method: 'GET',
      url: `/venues/setup?type=${type}` 
    }).then((data) => {
      // Normalize the data being returned.
      let formatedData = {
        timeDuration: data.duration,
        slotsPerTime: data.count,
        startDate: moment(parseInt(data.start, 10) * 1000).format('MMMM D, YYYY'),
        affiliationId: data.affiliationId,
        type: data.type
      };

      if (data.timeRanges) {
        formatedData.times = JSON.parse(data.timeRanges);
      }
      
      dispatch({
        type: SETUP_GET_COMPLETE,
        data: formatedData 
      });
    }).catch((error) => {
      dispatch({ type: SETUP_GET_FAIL, error });
    });
  }
};

export const SETUP_SAVE_START    = 'SETUP_SAVE_START';
export const SETUP_SAVE_FAIL     = 'SETUP_SAVE_FAIL';
export const SETUP_SAVE_COMPLETE = 'SETUP_SAVE_COMPLETE';

export const saveData = (data) => {
  return (dispatch) => {
	  // RGS changed the JSON source from data.timeRanges to data.times
    dispatch({ type: SETUP_SAVE_START });
    return Api({
      method: 'POST',
      data: {
        type: data.type,
        affiliationId: data.affiliationId,
        duration: data.timeDuration,
        timeRanges: JSON.stringify(data.times),
        count: data.slotsPerTime,
        start: moment(new Date(data.startDate)).unix()
      },
      url: '/venues/setup'
    }).then(() => {
      dispatch({ type: SETUP_SAVE_COMPLETE });
    }).catch((error) => {
      dispatch({ type: SETUP_SAVE_FAIL, error })
    });
  };
}
