import React from 'react';
import './Header.css';
import logo from '../../images/wcdLogo.75bd35f4.png';

const Header = () => {
    return ( 
        <div className="header">
            <img src={logo} alt="WCD logo" className="header-logo"/>
            <h2 className="header-title">R E P L A C E R</h2>
        </div>
     );
}
 
export default Header;