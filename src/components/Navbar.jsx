import { useNavigate } from 'react-router-dom';
import './../css/navbarStyle.css';
import libraryIcon from './../assets/library-icon.jpg';
import { useState } from 'react';

function Navbar() {
    const [currentAddress, setCurrentAddress] = useState('/');
    const navigate = useNavigate();

    const handleClick = (e) => {
        const pageAddress = e.target.id.split('-')[0];
        if (pageAddress === 'home') {
            navigate('/');
            setCurrentAddress('/');
        } else {
            navigate(`/${pageAddress}`);
            setCurrentAddress(`/${pageAddress}`);
        }

    };

    return (
        <nav className='navbar'>
            <div className='navbar-title'>
                <img src={libraryIcon} alt="library_icon" />
                <h1>Management System</h1>
            </div>
            <ul>
                <li id='home-link' onClick={(e) => handleClick(e)} className={currentAddress === '/' ? 'selected' : ''}>Home</li>
                <li id='books-link' onClick={(e) => handleClick(e)} className={currentAddress === '/books' ? 'selected' : ''}>Books</li>
                <li id='authors-link' onClick={(e) => handleClick(e)} className={currentAddress === '/authors' ? 'selected' : ''}>Authors</li>
                <li id='categories-link' onClick={(e) => handleClick(e)} className={currentAddress === '/categories' ? 'selected' : ''}>Categories</li>
                <li id='publishers-link' onClick={(e) => handleClick(e)} className={currentAddress === '/publishers' ? 'selected' : ''}>Publishers</li>
                <li id='borrows-link' onClick={(e) => handleClick(e)} className={currentAddress === '/borrows' ? 'selected' : ''}>Borrows</li>
            </ul>
        </nav>
    );
}

export default Navbar;
