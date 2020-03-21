import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './Landing';
import Navbar from './Navbar';
import Login from './Login';
import Signup from './Signup';

function App() {
  return (
    <div className="container mx-auto">
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/Signup" component={Signup}></Route>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
