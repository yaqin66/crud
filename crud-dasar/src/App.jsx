// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sidebar from "./component/Sidebar"; // Pastikan ini digunakan di Layout
import Profile from "./pages/Profile";
import Transaksi from "./pages/Transaksi";
import History from "./pages/History";
import Login from "./auth/Login"; // Komponen login
import Register from './auth/Register'; // Komponen register
import Layout from './Layout'; // Import Layout yang baru dibuat

const App = () => {
  return (
    <div className="h-screen">
      <BrowserRouter>
        <Routes>
          {/* Rute untuk halaman login dan register tanpa layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rute untuk halaman-halaman lain dengan layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="transaksi" element={<Transaksi />} />
            <Route path="history" element={<History />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Opsional: Rute wildcard untuk menangani 404 */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
