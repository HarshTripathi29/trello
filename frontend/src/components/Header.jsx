import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {

    const handleLogout = () => {
        // Implement your logout logic here
        console.log('Logout clicked');
        // For example, clear tokens, etc.
    };

    return (
        <header className="header">
            <div className="header-left">
                <h1>WorkJam</h1>
            </div>
          
            <div className="header-right">
            <Link to='/login'><button onClick={handleLogout} className="header-button">Login</button></Link>
            </div>
        </header>
    );
};

export default Header;
