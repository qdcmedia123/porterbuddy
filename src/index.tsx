import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router, Route} from 'react-router-dom';
import ListCountries from './components/ListCountries';
import Languages from './components/Languages';

ReactDOM.render(
  <React.StrictMode>
    <Router basename = "/">
    <Route exact path = "/" component = { ListCountries }/>
    <Route exact path = "/languages" component = { Languages} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
