import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { StateContext } from './../../context/StateContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { handleTurnBack, handleInput, handleSave, fetchDataItem, fetchDataList } from './../../utils/helpers';
import Navbar from './../../components/Navbar';
import DeleteConfirmation from './../../components/DeleteConfirmation';
import ToastMessage from './../../components/ToastMessage';
import './../../css/editPageStyles.css';
import CategorySelector from '../../components/CategorySelector';
import ItemSelector from '../../components/ItemSelector';

const BookEdit = () => {
  const navigate = useNavigate();
  const { page, id } = useParams();
  const { authors, setAuthors, publishers, setPublishers, categories, setCategories } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isAllLoading, setIsAllLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageData, setMessageData] = useState({ message: '', color: 'black' });
  const [book, setBook] = useState({ id: 0, name: '', publicationYear: '', stock: '', author: { id: 0, name: '' }, publisher: { id: 0, name: '' }, categories: [] });

  useEffect(() => {
    const fetchAll = async () => {
      setIsAllLoading(true);
      await Promise.all([
        fetchDataItem(setBook, setIsLoading, page, id, navigate),
        fetchDataList(setAuthors, setIsLoading, 'authors', navigate),
        fetchDataList(setPublishers, setIsLoading, 'publishers', navigate),
        fetchDataList(setCategories, setIsLoading, 'categories', navigate),
      ]);
      setIsAllLoading(false);
    }
    fetchAll();
  }, [page, id]);

  useEffect(() => {
    setBook((prevItem) => {
      if (prevItem.publicationYear === -12345) {
        return { ...prevItem, publicationYear: '' };
      }
      return prevItem;
    });
  }, [book.publicationYear]);

  const handleSaveBtn = () => {
    if (book.name.trim() === '') {
      setMessageData({ message: 'Book name cannot be empty!', color: '#FF2400' });
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
      return;
    }
    if (!book.author || book.author.id === 0) {
      setMessageData({ message: 'Author cannot be empty!', color: '#FF2400' });
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
      return;
    }
    if (!book.publisher || book.publisher.id === 0) {
      setMessageData({ message: 'Publisher cannot be empty!', color: '#FF2400' });
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
      return;
    }
    let newBook = { ...book }
    if (newBook.publicationYear === '') {
      newBook = { ...newBook, publicationYear: -12345 };
    }
    if (newBook.stock === '' || newBook.stock < 0) {
      newBook = { ...newBook, stock: 0 };
    }
    handleSave('Book', newBook, setIsLoading, page, id, navigate, setShowMessage, setMessageData);
  };

  return (
    <div className='item-edit-page'>
      <Navbar />
      <button onClick={() => handleTurnBack(navigate, page)} className='turn-back-btn'><FontAwesomeIcon icon={faAngleLeft} /></button>
      {showMessage && <ToastMessage messageData={messageData} />}
      {showConfirm && <DeleteConfirmation itemName='Book' item={book} setIsLoading={setIsLoading} page={page} id={id} navigate={navigate} setShowConfirm={setShowConfirm} setShowMessage={setShowMessage} setMessageData={setMessageData} />}
      {isLoading && isAllLoading ? <h1 className='loading-screen'>Book Loading...</h1> : <div className='item'>
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
          <h2>Author:</h2>
          <div className='author-input-area'>
            <ItemSelector itemKey='Author' items={authors} item={book} setItem={setBook} />
          </div>
        </div>

        <div className='input-row'>
          <h2>Publisher:</h2>
          <div className='publisher-input-area'>
            <ItemSelector itemKey='Publisher' items={publishers} item={book} setItem={setBook} />
          </div>
        </div>

        <div className='input-row'>
          <h2>Categories:</h2>
          <div className='category-input-area'>
            <CategorySelector categories={categories} book={book} setBook={setBook} />
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