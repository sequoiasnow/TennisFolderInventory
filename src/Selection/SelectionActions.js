import Api from '../Api';

export const SELECTION_REFRESH_START = 'SELECTION_REFRESH_START';
export const SELECTION_REFRESH_END   = 'SELECTION_REFRESH_END';
export const SELECTION_REFRESH_FAIL  = 'SELECTION_REFRESH_FAIL';

export const refresh = () => {
  return (dispatch) => {
    dispatch({ type: SELECTION_REFRESH_START });
    return Api({
      url: '/venues/leagues', 
      method: 'GET'
    }).then((data) => {
      dispatch({ type: SELECTION_REFRESH_END, leagues: data });
    }).catch((error) => {
      dispatch({ type: SELECTION_REFRESH_FAIL, error });
    });
  };
};

export const SELECTION_SELECT = 'SELECTION_SELECT';

export const select = ({id , title}) => {
  return {
    type: SELECTION_SELECT,
    id,
    title
  }
};
