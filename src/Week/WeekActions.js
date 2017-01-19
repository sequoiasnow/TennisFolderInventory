import Api from '../Api';

export const SEND_REFRESH_SLOTS = 'SEND_REFRESH_SLOTS';
export const FAILED_REFRESH_SLOTS = 'FAILED_REFRESH_SLOTS';
export const CONFIRM_REFRESH_SLOTS ='CONFIRM_REFRESH_SLOTS';

export const SEND_SELECT_SLOT = 'SEND_SELECT_SLOT';
export const CONFIRM_SELECT_SLOT = 'CONFIRM_SELECT_SLOT';
export const FAILED_SELECT_SLOT = 'FAILED_SELECT_SLOT';

export const SEND_UNSELECT_SLOT = 'SEND_UNSELECT_SLOT';
export const CONFIRM_UNSELECT_SLOT = 'CONFIRM_UNSELECT_SLOT';
export const FAILED_UNSELECT_SLOT = 'FAILED_UNSELECT_SLOT';

export const refresh = ({ type, affiliationId }) => {
  return (dispatch) => {
    dispatch({ type: SEND_REFRESH_SLOTS });
    return Api({
      method: 'GET',
      url: `/venues/slots?type=${type}&affiliationId=${affiliationId}&status=1-4`
    }).then((data) => {
      dispatch({ type: CONFIRM_REFRESH_SLOTS, data });
    }).catch((error) => {
      dispatch({ type: FAILED_REFRESH_SLOTS, error })
    });
  }
}


export const select = ({ date, id, index, time, league, affiliationId }) => {
  return (dispatch) => {
    dispatch({
      type: SEND_SELECT_SLOT 
    });
    return Api({
      url: '/venues/slots',
      method: 'POST',
      data: {
        start: date.unix(),
        stage: index,
        slot: time,
        status: 1,
        type: league,
        affiliationId,
        venueid: id
      }
    }).then((data) => {
      console.log(data);
      dispatch({
        type: CONFIRM_SELECT_SLOT,
        newSlot: {
          id: parseInt(data.venueId),
          status: 1,
          date,
          index,
          time
        }
      })
    }).catch((error) => {
      dispatch({
        type: FAILED_SELECT_SLOT,
        error
      })
    })
  };
};

export const unselect = ({id}) => {
  return (dispatch) => {
    dispatch({ type: SEND_UNSELECT_SLOT });
    return Api({
      url: `/venues/slots/${id}`,
      method: 'DELETE'
    }).then(() => {
      dispatch({ type: CONFIRM_UNSELECT_SLOT, id });
    }).catch((error) => {
      dispatch({ type: FAILED_UNSELECT_SLOT, id, error });
    });
  };
};
