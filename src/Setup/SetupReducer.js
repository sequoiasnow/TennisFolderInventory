import {
  SETUP_UPDATE_FIELD,
  SETUP_UPDATE_TIME_FIELD,
  SETUP_GET_START,
  SETUP_GET_FAIL,
  SETUP_GET_COMPLETE,
  SETUP_SAVE_START,
  SETUP_SAVE_FAIL,
  SETUP_SAVE_COMPLETE } from './SetupActions';
import moment from 'moment';

const initialState = {
  slotsPerTime: 1,
  timeDuration: 3,
  startDate: moment().format('MMMM D, YYYY'),
  times: {
    morning: '9:00 AM',
    midday: '1:00 PM',
    evening: '6:00 PM'
  },
  isFetching: false,
  lastError: '',
  lastFetch: new Date(0)
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SETUP_UPDATE_FIELD:
      return Object.assign({}, state, {
        [action.name]: action.value
      });
    case SETUP_UPDATE_TIME_FIELD:
      return {
        ...state,
        times: {
          ...state.times,
          [action.name]: action.value
        } 
      };
    case SETUP_GET_START:
      return {
        ...state,
        isFethcing: true,
        lastFetch: new Date()
      }
    case SETUP_GET_FAIL:
      return {
        ...state,
        isFetching: false,
        lastError: action.error 
      }
    case SETUP_GET_COMPLETE:
      return {
        ...state,
        ...action.data
      }
    case SETUP_SAVE_START:
      return {
        ...state,
        isFetching: true
      };
    case SETUP_SAVE_FAIL:
      return {
        ...state,
        isFetching: false,
        lastError: action.error 
      }
    case SETUP_SAVE_COMPLETE:
      return {
        ...state,
        isFetching: false,
        isSaved: true
      }
    default:
      return state;
  }
}

export default reducer;
