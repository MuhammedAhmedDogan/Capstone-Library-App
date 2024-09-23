import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { StateContext } from './../../context/StateContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { handleTurnBack, handleInput, handleSave, fetchDataItem, fetchDataList } from './../../utils/helpers';
import Navbar from './../../components/Navbar';
import DeleteConfirmation from './../../components/DeleteConfirmation';
import ToastMessage from './../../components/ToastMessage';
import './../../css/bookEditStyle.css';

const BookEdit = () => {
  const navigate = useNavigate();
  const { page, id } = useParams();
  const { authors, setAuthors, publishers, setPublishers, categories, setCategories } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageData, setMessageData] = useState({ message: '', color: 'black' });
  const [book, setBook] = useState({ id: 0, name: '', publicationYear: '', stock: '', author: {}, publisher: {}, categories: [] });

  useEffect(() => {
      fetchDataItem(setBook, setIsLoading, page, id, navigate);
      fetchDataList(setAuthors, setIsLoading, 'authors', navigate);
      fetchDataList(setPublishers, setIsLoading, 'publishers', navigate);
      fetchDataList(setCategories, setIsLoading, 'categories', navigate);
  }, []);

  useEffect(() => {
    setBook((prevItem) => {
      if (prevItem.publicationYear === -12345) {
        return { ...prevItem, publicationYear: '' };
      }
      return prevItem;
    });
  }, [book.publicationYear]);

  const handleSaveBtn = () => {
    if (book.name.trim() !== '') {
      let newBook = { ...book }
      if (newBook.publicationYear === '') {
        newBook = { ...newBook, publicationYear: -12345 };
      }
      if (newBook.stock === '' || newBook.stock < 0) {
        newBook = { ...newBook, stock: 0 };
      }
      handleSave('Book', newBook, setIsLoading, page, id, navigate, setShowMessage, setMessageData);
    } else {
      setMessageData({ message: 'Book name cannot be empty!', color: '#FF2400' });
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }
  };

  return (
    <div className='book-edit-page'>
      <Navbar />
      {showMessage && <ToastMessage messageData={messageData} />}
      {showConfirm && <DeleteConfirmation itemName='Book' item={book} setIsLoading={setIsLoading} page={page} id={id} navigate={navigate} setShowConfirm={setShowConfirm} setShowMessage={setShowMessage} setMessageData={setMessageData} />}
      {isLoading ? <h1 className='loading-screen'>Book Loading...</h1> : <div className='book'>
        <button onClick={() => handleTurnBack(navigate, page)} className='turn-back-btn'><FontAwesomeIcon icon={faAngleLeft} /></button>

        <h1 className='page-title'>Book</h1>

        <div className='input-row'>
          <h2>Name:</h2>
          <div className='input-area'>
            <input id='book-name'
              placeholder='Book Name'
              type="text" value={book.name}
              autoComplete='off'
              onChange={(e) => { handleInput(e, setBook) }} />
          </div>
        </div>

        <div className='input-row'>
          <h2>Publication Year:</h2>
          <div className='input-area'>
            <input id='book-publicationYear'
              placeholder='Book Publication Year'
              type="number" value={book.publicationYear}
              autoComplete='off'
              onChange={(e) => { handleInput(e, setBook) }} />
          </div>
        </div>






        <div className='input-row'>
          <h2>Stock:</h2>
          <div className='input-area'>
            <input id='book-stock'
              placeholder='Book Stock'
              type="number" value={book.stock}
              autoComplete='off'
              onChange={(e) => { handleInput(e, setBook) }} />
          </div>
        </div>

        <div className='save-delete-button-container'>
          <button onClick={() => setShowConfirm(true)} className='delete-btn'>Delete</button>
          <button onClick={handleSaveBtn} className='save-btn'>Save</button>
        </div>

      </div>}

    </div>
  )
}

export default BookEdit;