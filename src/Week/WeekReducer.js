import {
  SEND_SELECT_SLOT,
  CONFIRM_SELECT_SLOT,
  FAILED_SELECT_SLOT,
  SEND_UNSELECT_SLOT,
  CONFIRM_UNSELECT_SLOT,
  FAILED_UNSELECT_SLOT,
  SEND_REFRESH_SLOTS,
  FAILED_REFRESH_SLOTS,
  CONFIRM_REFRESH_SLOTS
} from './WeekActions';

const initialState = {
  slots: [],
  isFetching: false,
  lastError: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_SELECT_SLOT:
    case SEND_REFRESH_SLOTS:
    case SEND_UNSELECT_SLOT:
      return Object.assign({}, state, { isFetching: true });
    case CONFIRM_SELECT_SLOT:
      return Object.assign({}, state, {
        isFetching: false,
        slots: [...state.slots, action.newSlot]
      });
    case CONFIRM_UNSELECT_SLOT:
      return Object.assign({}, state, {
        isFetching: false,
        slots: state.slots.filter((slot) => {
          return slot.id != action.id
        })
      });
    case CONFIRM_REFRESH_SLOTS:
      return {
        ...state,
        slots: action.data.map((slot) => {
          return {
            index: parseInt(slot.stage),
            date: parseInt(slot.start) * 1000,
            id: parseInt(slot.venueId),
            status: parseInt(slot.status),
            time: parseInt(slot.slot)
          };
        })
      };
    case FAILED_SELECT_SLOT:
    case FAILED_UNSELECT_SLOT:
    case FAILED_REFRESH_SLOTS:
      return Object.assign({}, state, {
        isFetching: false,
        lastError: action.error
      });
    default:
      return state;
  }
};

export default reducer;
