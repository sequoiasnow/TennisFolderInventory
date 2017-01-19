import {
  SELECTION_REFRESH_START,
  SELECTION_REFRESH_END,
  SELECTION_REFRESH_FAIL,
  SELECTION_SELECT
} from './SelectionActions';


//RGS - I notice that 'id: 3' is here and we were getting a series of DB Venues with a 'type' of 3.   Check on this, what is '3'?  My guess 
//      is this is the initial and single button that first displayed before the leagues are fetched and presented.
//      If so, should probably put up blank OR a 'progress bar or notice', but not this default button
const initialState = {
  isRefreshing: false,
  error: '',
  leagues: [],
  current: {},
  lastRefresh: new Date(0)
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTION_REFRESH_START:
      return {
        ...state,
        isRefreshing: true
      };
    case SELECTION_REFRESH_END:
      return {
        ...state,
        isRefreshing: false,
        leagues: action.leagues.map((league) => {
          return {
            id: league.id,
            title: league.name
          }
        }),
        lastRefresh: new Date()
      };
    case SELECTION_REFRESH_FAIL:
      return {
        ...state,
        isRefreshing: false,
        error: action.error
      }
    case SELECTION_SELECT:
      return {
        ...state,
        current: {
          title: action.title,
          id: action.id
        }
      }
    default:
      return state;
  }
};

export default reducer;
