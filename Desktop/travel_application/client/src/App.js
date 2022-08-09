import React from 'react';
import { Container } from '@material-ui/core';
import {
  BrowserRouter,
  // HashRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Home from './components/Home/home';
import Navbar from './components/Navbar/navbar';
import Auth from './components/Auth/auth';
// import PostDetails from './components/'

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          {/* <Route path="/posts/:id" exact component={PostDetails} /> */}
          {/* <Route path="/auth" exact component={() => (!user ? <Auth /> : <Navigate to="/posts" />)} /> */}
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
