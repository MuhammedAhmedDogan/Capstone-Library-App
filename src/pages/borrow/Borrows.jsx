import { useEffect, useContext, useState } from 'react';
import { StateContext } from './../../context/StateContext';
import { fetchDataList, goToEditPage } from './../../utils/helpers';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './../../css/listPageStyles.css';

const Borrows = () => {
  const navigate = useNavigate();
  const { page } = useParams();
  const { borrows, setBorrows } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDataList(setBorrows, setIsLoading, page, navigate);
  }, []);

  useEffect(() => {
    const editedItems = borrows.map(item => {
      const borrowingDate = new Date(item.borrowingDate);
      const formattedBorrowingDate = borrowingDate.toLocaleDateString();
      let formattedReturnDate = '';
      if (item.returnDate !== '') {
        const returnDate = new Date(item.returnDate);
        formattedReturnDate = returnDate.toLocaleDateString();
      }
      return { ...item, borrowingDate: formattedBorrowingDate, returnDate: formattedReturnDate };
    });
    setBorrows(editedItems);
  }, [isLoading]);

  return (
    <div className='list-page'>
      <Navbar />
      {isLoading ? <h1 className='loading-screen'>Borrowing Records Loading...</h1> : <div className='list-container'>
        <h1 className='page-title'>Borrowing Records</h1>
        <div className='list-titles'>
          {borrows.length !== 0 && <div className='borrow-title-informations'>
            <h2>Borrower Name</h2>
            <h2>Borrower Mail</h2>
            <h2>Book</h2>
            <h2>Borrowing Date</h2>
            <h2>Return Date</h2>
          </div>}
          <button className='add-btn' onClick={() => goToEditPage(0, page, navigate)}>Add New Record</button>
        </div>
        {borrows.map(item => (
          <div key={item.id} className='item-card'>
            <div className='borrow-informations'>
              <h2>{item.borrowerName}</h2>
              <h2>{item.borrowerMail}</h2>
              <h2>{item.book.name}</h2>
              <h2>{item.borrowingDate}</h2>
              <h2>{item.returnDate}</h2>
            </div>
            <button className='view-btn' onClick={() => goToEditPage(item.id, page, navigate)}>View / Edit</button>
          </div>
        ))}
      </div>}
    </div>
  )
}

export default Borrows;