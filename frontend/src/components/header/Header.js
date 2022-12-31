import { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

// Should take in IsAdmin prop in the future

export default function Header() {

    const [hovered, setHovered] = useState(false);

    function handleHover() {
        setHovered(!hovered);
    }

    return (
        <div className='header'>
            <img 
                src={require('./clover.png')} 
                alt='SaveTheGaels Logo' 
                className='logo' 
            />
            <Link to="/" className='title'>SaveTheGaels</Link>
            <Link 
                to="/about" 
                className='nav'
                onMouseEnter={handleHover}
                onMouseLeave={handleHover} 
                style={{ background: hovered ? '#dee0df' : 'none' }}
            >
                About
            </Link>
        </div>
    )
}