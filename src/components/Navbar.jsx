import { useNavigate, useParams } from 'react-router-dom';
import libraryIcon from './../assets/library-icon.jpg';
import './../css/navbarStyles.css';

function Navbar() {
    const navigate = useNavigate();
    const { page } = useParams();

    const handleClick = (e) => {
        const pageAddress = e.currentTarget.id.split('-')[0];
        if (pageAddress === 'home') {
            navigate('/');
        } else {
            navigate(`/${pageAddress}`);
        }

    };

    return (
        <nav className='navbar'>
            <div className='navbar-title'>
                <img src={libraryIcon} alt="library_icon" />
                <h1>Management System</h1>
            </div>
            <ul>
                <li id='home-link' onClick={(e) => handleClick(e)}>Home</li>
                <li id='books-link' onClick={(e) => handleClick(e)} className={page === 'books' ? 'selected' : ''}>Books</li>
                <li id='authors-link' onClick={(e) => handleClick(e)} className={page === 'authors' ? 'selected' : ''}>Authors</li>
                <li id='categories-link' onClick={(e) => handleClick(e)} className={page === 'categories' ? 'selected' : ''}>Categories</li>
                <li id='publishers-link' onClick={(e) => handleClick(e)} className={page === 'publishers' ? 'selected' : ''}>Publishers</li>
                <li id='borrows-link' onClick={(e) => handleClick(e)} className={page === 'borrows' ? 'selected' : ''}>Borrows</li>
            </ul>
        </nav>
    );
}

export default Navbar;
