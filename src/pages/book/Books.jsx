import { useEffect, useContext, useState } from 'react';
import { StateContext } from './../../context/StateContext';
import { fetchDataList, goToEditPage } from './../../utils/helpers';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './../../css/listPageStyles.css';

const Books = () => {
  const navigate = useNavigate();
  const { page } = useParams();
  const { books, setBooks } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDataList(setBooks, setIsLoading, page, navigate);
  }, []);

  useEffect(() => {
    const editedItems = books.map(item => {
      if (item.publicationYear === -12345) {
        return { ...item, publicationYear: '' };
      }
      return item;
    });
    setBooks(editedItems);
  }, [isLoading]);

  return (
    <div className='list-page'>
      <Navbar />
      {isLoading ? <h1 className='loading-screen'>Books Loading...</h1> : <div className='list-container'>
        <h1 className='page-title'>Books</h1>
        <div className='list-titles'>
          {books.length !== 0 && <div className='book-title-informations'>
            <h2>Name</h2>
            <h2>Publication Year</h2>

            <h2>Author</h2>
            <h2>Publisher</h2>
            <h2>Categories</h2>
            <h2 style={{ width: '80px' }}>Stock</h2>
          </div>}
          <button className='add-btn' onClick={() => goToEditPage(0, page, navigate)}>Add New Book</button>
        </div>
        {books.map(item => (
          <div key={item.id} className='item-card'>
            <div className='book-informations'>
              <h2>{item.name}</h2>
              <h2>{item.publicationYear}</h2>

              <h2>{item.author.name}</h2>
              <h2>{item.publisher.name}</h2>
              <h2>{item.categories.map((category, index) => (
                <span key={category.id}>
                  {category.name}{index < item.categories.length - 1 ? ', ' : ''}
                </span>))}</h2>
              <h2 style={{ width: '80px' }}>{item.stock}</h2>
            </div>
            <button className='view-btn' onClick={() => goToEditPage(item.id, page, navigate)}>View / Edit</button>
          </div>
        ))}
      </div>}
    </div>
  )
}

export default Books;