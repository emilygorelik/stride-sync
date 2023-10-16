import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserTokenProvider } from './api';
import './index.css';
// import Callback from './screens/callback';
// import Home from './screens/home';
import Login from './screens/login';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserTokenProvider>  
        <Login/>
        {/* <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router> */}
      </UserTokenProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
