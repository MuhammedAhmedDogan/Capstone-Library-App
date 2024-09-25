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
import ItemSelector from '../../components/ItemSelector';

const BorrowEdit = () => {
  const navigate = useNavigate();
  const { page, id } = useParams();
  const { books, setBooks } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isAllLoading, setIsAllLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageData, setMessageData] = useState({ message: '', color: 'black' });
  const [borrow, setBorrow] = useState({ id: 0, borrowerName: '', borrowerMail: '', borrowingDate: '', returnDate: '', book: { id: 0, name: '', stock: 0 } });

  useEffect(() => {
    const fetchAll = async () => {
      setIsAllLoading(true);
      await Promise.all([
        fetchDataItem(setBorrow, setIsLoading, page, id, navigate),
        fetchDataList(setBooks, setIsLoading, 'books', navigate),
      ]);
      setIsAllLoading(false);
    }
    fetchAll();
  }, [page, id]);

  const handleSaveBtn = () => {
    if (borrow.borrowerName.trim() === '') {
      setMessageData({ message: 'Borrower name cannot be empty!', color: '#FF2400' });
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
      return;
    }
    if (borrow.borrowingDate === '') {
      setMessageData({ message: 'Borrowing date cannot be empty!', color: '#FF2400' });
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
      return;
    }
    if (borrow.id !== 0 && borrow.returnDate === '') {
      setMessageData({ message: 'Return date cannot be empty!', color: '#FF2400' });
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
      return;
    }

    if (borrow.returnDate < borrow.borrowingDate) {
      setMessageData({ message: 'The return date must be later than the borrowing date!', color: '#FF2400' });
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
      return;
    }

    handleSave('Borrowing Record', borrow, setIsLoading, page, id, navigate, setShowMessage, setMessageData);
  };

  return (
    <div className='item-edit-page'>
      <Navbar />
      <button onClick={() => handleTurnBack(navigate, page)} className='turn-back-btn'><FontAwesomeIcon icon={faAngleLeft} /></button>
      {showMessage && <ToastMessage messageData={messageData} />}
      {showConfirm && <DeleteConfirmation itemName='Borrowing Record' item={borrow} setIsLoading={setIsLoading} page={page} id={id} navigate={navigate} setShowConfirm={setShowConfirm} setShowMessage={setShowMessage} setMessageData={setMessageData} />}
      {isLoading && isAllLoading ? <h1 className='loading-screen'>Borrowing Record Loading...</h1> : <div className='item'>
        <h1 className='page-title'>Borrowing Record</h1>

        <div className='input-row'>
          <h2>Borrower Name:</h2>
          <div className='input-area'>
            <input id='borrow-borrowerName'
              placeholder='Borrower Name'
              type="text" value={borrow.borrowerName}
              autoComplete='off'
              onChange={(e) => { handleInput(e, setBorrow) }} />
          </div>
        </div>

        {borrow.id === 0 && <div className='input-row'>
          <h2>Borrower Mail:</h2>
          <div className='input-area'>
            <input id='borrow-borrowerMail'
              placeholder='Borrower Mail'
              type="email" value={borrow.borrowerMail}
              autoComplete='off'
              onChange={(e) => { handleInput(e, setBorrow) }} />
          </div>
        </div>}



        <div className='input-row'>
          <h2>Borrowing Date:</h2>
          <div className='input-area'>
            <input id='borrow-borrowingDate'
              placeholder='Borrowing Date'
              type="date" value={borrow.borrowingDate}
              onChange={(e) => { handleInput(e, setBorrow) }} />
          </div>
        </div>

        {borrow.id !== 0 && <div className='input-row'>
          <h2>Return Date:</h2>
          <div className='input-area'>
            <input id='borrow-returnDate'
              placeholder='Return Date'
              type="date" value={borrow.returnDate}
              onChange={(e) => { handleInput(e, setBorrow) }} />
          </div>
        </div>}

        <div className='save-delete-button-container'>
          <button onClick={() => setShowConfirm(true)} className='delete-btn'>Delete</button>
          <button onClick={handleSaveBtn} className='save-btn'>Save</button>
        </div>

      </div>}

    </div>
  )
}

export default BorrowEdit;