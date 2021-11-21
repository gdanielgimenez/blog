
import React from 'react';
import Login from './components/Login';
import Home from './components/Home';
import BlogPage from './components/BlogPage';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}>
          </Route>
          <Route exact path="/Home" element={<Home/>}>
          </Route>
          <Route exact path="/:blog" element={<BlogPage/>}>
          </Route>
        </Routes>
      </Router> 
    </div>
  );
}

export default App;
