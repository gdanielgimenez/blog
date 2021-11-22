
import React from 'react';
import Login from './components/Login';
import Home from './components/Home';
import BlogPage from './components/BlogPage';
import Edit from './components/Edit';
import CreateBlog from './components/CreateBlog';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}>
          </Route>
          <Route exact path="/Home" element={<Home/>}>
          </Route>
          <Route exact path="/:blog" element={<BlogPage/>}>
          </Route>
          <Route exact path="/Edit" element={<Edit/>}>
          </Route>
          <Route exact path="/CreateBlog" element={<CreateBlog/>}>
          </Route>
        </Routes>
      </Router> 
    </div>
  );
}

export default App;
