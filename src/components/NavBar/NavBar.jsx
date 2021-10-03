import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './NavBar.css';

const NavBar = () => {
    const history = useHistory();
    const [currentPage, setCurrentPage] = useState(history.location.pathname);

    history.listen((location) => {
        setCurrentPage(location.pathname);
    });

    const NavButton = ({ label, path }) => {
        return <div className={`nav-btn ${currentPage === path ? 'current' : ''}`}>{label}</div>;
    };

    return (
        <div className="navbar">
            <NavButton label="User" path="/" />
            <NavButton label="Privacy" path="/privacy" />
            <NavButton label="Done" path="/done" />
        </div>
    );
};

export default NavBar;
