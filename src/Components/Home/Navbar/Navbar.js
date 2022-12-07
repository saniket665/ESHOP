import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import "./Navbar.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { auth } from '../../../Config/Firebase';

const Navbar = ({user, cartCount}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/login");
    });
  }
  return (
    <div className="navbar">
      <Link to="/"><div className="logo"><h2>ESHOP</h2></div></Link>
      {!user && 
        <ul className="links">
          <Link to="/login"><li className="link">Login</li></Link>
          <Link to="/signup"><li className="link">Sign Up</li></Link>
        </ul>
      }
      {user &&
      <ul className="links">
        <li className="link user-link">Hi, {user}</li>
        <li className="link" onClick={handleLogout}>Logout</li>
        <Link to="/cart">
          <Button color="inherit" style={{position: "relative", marginTop: "0.5rem"}}>
            <ShoppingCartIcon /><span className="cart-count">{cartCount}</span></Button>
          </Link>
    </ul> 
      }
    </div>
  )
}

export default Navbar