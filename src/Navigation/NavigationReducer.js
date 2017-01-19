import { NAVIGATION_CHANGE_ROUTE } from './NavigationActions';
import { LEAGUE_SELECT } from './constants';

const initialState = LEAGUE_SELECT;

const reducer = (state = initialState, action) => {
  console.log(action);
  if (action.type == NAVIGATION_CHANGE_ROUTE) {
    return action.route;
  }
  return state;
};

export default reducer;
