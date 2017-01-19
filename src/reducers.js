import { combineReducers } from 'redux';
import timeSlots from './Week/WeekReducer';
import navigation from './Navigation/NavigationReducer';
import setup from './Setup/SetupReducer.js';
import league from './Selection/SelectionReducer';

export default combineReducers({
  timeSlots,
  navigation,
  setup,
  league
});
