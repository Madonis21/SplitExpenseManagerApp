import React from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import {createStore} from 'redux'
import reducer from './reducers/master-reducer'
import { Provider } from 'react-redux';

let store = createStore(reducer);

function App() {
  return (
    <Provider store = {store}>
    <div className="App">
        <LandingPage></LandingPage>
    </div>
    </Provider>
  );
}

export default App;
