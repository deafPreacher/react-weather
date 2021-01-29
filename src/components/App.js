import React, {useState} from 'react';
import {
	BrowserRouter as Router,
	Route, Switch,
} from 'react-router-dom';
import {getNightClass} from '../utils/helpers.js';
import Forecast from './Forecast'
import Weather from './Weather';
import Home from './Home';
import './App.css';

const App = (props) => {
  const [nightMode, setNightMode] = useState(false);

  return (
    <div className={getNightClass('App', nightMode)}>
      <div className='nightModeContainer'>
        <button 
          className='nightModeBtn'
          onClick={() => setNightMode(!nightMode)} >
          {nightMode ? 'switch to light' : 'switch to night'}
        </button>
      </div>
      <Router>
      	
      	<Switch>      		
      		<Route path='/forecast/:cityId'> <Forecast nightMode={nightMode}/> </Route>
      		<Route path='/weather/:city'> <Weather nightMode={nightMode}/> </Route>
      		<Route path='/'> <Home nightMode={nightMode}/> </Route>
      	</Switch>

      </Router>
    </div>
  );
}

export default App;