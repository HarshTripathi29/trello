import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, checkLogin } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ boardTitle }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1>WorkJam</h1>
      </div>
      <div className="header-center">
        {isLoggedIn && boardTitle && (
          <>
            <button className="header-button" onClick={() => navigate('/dashboard')}>All Boards</button>
            <h2 className="board-title-header">{boardTitle}</h2>
          </>
        )}
      </div>
      <div className="header-right">
        {isLoggedIn ? (
          <button onClick={handleLogout} className="header-button">
            Logout
          </button>
        ) : (
          <button onClick={handleLogin} className="header-button">
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
