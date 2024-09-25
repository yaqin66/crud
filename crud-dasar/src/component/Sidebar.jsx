import React from "react";
import { Link } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri"

const Sidebar = () => {
    return (
        <div className="border h-screen p-6 shadow-lg items-center">
            <div>Sidebar</div>
            <div className="mt-10 grid gap-3">
                <Link to="/" className="hover:scale-110 p-2">
                    <div >Home</div>
                </Link>
                <Link to="transaksi" className="hover:scale-110 p-2">
                    <div>Transaksi</div>
                </Link>
                <Link to="history" className="hover:scale-110 p-2">
                    <div>History</div>
                </Link>
                <Link to="profile" className="hover:scale-110 p-2">
                    <div>Profile</div>
                </Link>
                <Link to="/login">
                    <div className="translate-y-[520px] translate-x-5 hover:scale-105 transition-all duration-300">
                        <RiLogoutBoxLine size={30} />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
