import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';  
import Sidebar from './components/Sidebar';
import Home from './components/Homepage';
import Login from './components/Login';
import ContactsPage from './components/Contact';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateContactPage from './components/contacts/Createcontact';
import TopBar from './components/topbar';

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Router>
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />

          <Route path="*" element={isLoggedIn ? (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
              <TopBar />

              <div style={{ display: 'flex', flex: 2 }}>
                <div style={{ width: '250px', backgroundColor: '#2f3542' }}>
                  <Sidebar />
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/contacts" element={<ContactsPage />} />
                    <Route path="/contacts/create" element={<CreateContactPage />} />
                    <Route path="/contacts/edit/:id" element={<CreateContactPage />} />
                  </Routes>
                </div>
              </div>
            </div>
          ) : (
            <Navigate to="/login" />
          )} />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default App;
