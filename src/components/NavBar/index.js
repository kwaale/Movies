import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../LogoKW.png'
import InputSearch from '../InputSearch'

import './Navbar.css';

export default function NavBar() {
    return (
        <header className="navbar">
            <div>
                <img id="LogoKW.png" src={Logo} width="30" height="30" className="d-inline-block align-top" alt="KW" />
            </div>
            <nav>
                <ul className="list">
                <InputSearch/>
                    <li className="list-item">
                        <NavLink exact to="/" >Home</NavLink>
                        <NavLink to="/favs" >Favoritas</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}