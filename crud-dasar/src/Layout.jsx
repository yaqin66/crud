// Layout.jsx
import React from 'react';
import Sidebar from "./component/Sidebar";
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex h-full">
      {/* Sidebar dengan lebar tetap */}
      <div className="fixed h-full">
        <Sidebar />
      </div>
      {/* Konten utama akan menempati sisa ruang */}
      <div className="ml-36 p-4 flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
