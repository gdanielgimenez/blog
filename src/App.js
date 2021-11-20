
import React from 'react';
import Login from './components/Login';
import Home from './components/Home';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Button} from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}>
          </Route>
          <Route exact path="/Home" element={<Home/>}>
          </Route>
        </Routes>
      </Router> 
    </div>
  );
}

export default App;
