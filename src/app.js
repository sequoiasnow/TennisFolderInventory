import React from 'react';
import { Provider } from 'react-redux';
import Navigation from './Navigation/index';
import configureStore from './configureStore';

const store = configureStore();
store.dispatch({ type: 'TEST_REDUCERS' });

const App = () => {
  return (
    <Provider store={store}> 
      <Navigation /> 
    </Provider>
  )
};

export default App
