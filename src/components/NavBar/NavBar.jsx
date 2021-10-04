import { faCheck, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './NavBar.css';

const NavBar = () => {
    const history = useHistory();
    const [currentPage, setCurrentPage] = useState(history.location.pathname);

    history.listen((location) => {
        setCurrentPage(location.pathname);
    });

    const NavItem = ({ label, path, icon }) => {
        return (
            <div className={`nav-btn ${currentPage === path ? 'current' : ''}`}>
                <FontAwesomeIcon icon={icon} size="2x" />
                <p>{label}</p>
            </div>
        );
    };

    return (
        <div className="navbar">
            <NavItem label="User" path="/" icon={faUser} />
            <NavItem label="Privacy" path="/privacy" icon={faLock} />
            <NavItem label="Done" path="/done" icon={faCheck} />
        </div>
    );
};

export default NavBar;
