export const NAVIGATION_CHANGE_ROUTE = 'NAVIGATION_CHANGE_ROUTE';

export const changeRoute = (route) => {
  return {
    type: NAVIGATION_CHANGE_ROUTE,
    route
  };
}

