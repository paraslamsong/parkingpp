import logo from './logo.svg';
import './App.css';
import { firebaseConfig } from './firebase/firebase_init';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/login_page/login_page';
import NavbarContainer from './components/navbar';
import HomePage from './pages/home_page/home_page';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SearchResultPage from './pages/search_result_page/search_result_page';
import DetailPage from './pages/detail_page/detail_page';
import BookingsPage from './pages/bookings_page/bookings_page';
import Login from './pages/login_page/login';
import Registration from './pages/login_page/registration';

function App() {

  initializeApp(firebaseConfig);
  return (

    <GoogleOAuthProvider clientId="188525358983-tc98ohm2p2ieg9are0r54qf3312obgop.apps.googleusercontent.com">
      <BrowserRouter>
        <NavbarContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/places" element={<SearchResultPage />} />
          <Route path="/place" element={<DetailPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </BrowserRouter>
      <div
    class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5" style={{position: 'fixed',
      left: 0,
      bottom: 0,
    background: '#4c56af',
      width:'100%'}}>
    <div class="text-white mb-3 mb-md-0">
      Copyright © 2020. All rights reserved.
    </div>

    </div>
    </GoogleOAuthProvider>
    
  );
}

export default App;
