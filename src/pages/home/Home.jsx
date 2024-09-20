import libraryIcon from './../../assets/library-icon.jpg';
import publishersIcon from './../../assets/publishers-icon.png';
import booksIcon from './../../assets/books-icon.png';
import authorsIcon from './../../assets/authors-icon.png';
import categoriesIcon from './../../assets/categories-icon.png';
import borrowsIcon from './../../assets/borrows-icon.png';
import { useNavigate } from 'react-router-dom';
import './../../css/homeStyle.css';

const Home = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    const pageAddress = e.currentTarget.id.split('-')[0];
    navigate(`/${pageAddress}`);
  };

  return (
    <div className='home-page'>
      <div className='home-page-title'>
        <h1>Wellcome to the</h1>
        <img src={libraryIcon} alt="library_icon" />
        <h1>Management System</h1>
      </div>
      <p>Effortlessly manage the collection of books, authors, categories, publishers, and borrowing records.</p>
      <div className='navigation-icons'>
        <div id='books-icon' className='icon-frame' onClick={(e) => handleClick(e)}>
          <img src={booksIcon} alt="books_icon" />
          <p>BOOKS</p>
        </div>
        <div id='authors-icon' className='icon-frame' onClick={(e) => handleClick(e)}>
          <img src={authorsIcon} alt="authors_icon" />
          <p>AUTHORS</p>
        </div>
        <div id='categories-icon' className='icon-frame' onClick={(e) => handleClick(e)}>
          <img src={categoriesIcon} alt="categories_icon" />
          <p>CATEGORIES</p>
        </div>
        <div id='publishers-icon' className='icon-frame' onClick={(e) => handleClick(e)}>
          <img src={publishersIcon} alt="publishers_icon" />
          <p>PUBLISHERS</p>
        </div>
        <div id='borrows-icon' className='icon-frame' onClick={(e) => handleClick(e)}>
          <img src={borrowsIcon} alt="borrows_icon" />
          <p>BORROWING RECORDS</p>
        </div>
      </div>

    </div>
  )
}

export default Home