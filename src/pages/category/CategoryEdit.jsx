import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { handleTurnBack, handleInput, handleSave, fetchDataItem } from './../../utils/helpers';
import Navbar from './../../components/Navbar';
import DeleteConfirmation from './../../components/DeleteConfirmation';
import ToastMessage from './../../components/ToastMessage';
import './../../css/categoryEditStyle.css';

const CategoryEdit = () => {
  const navigate = useNavigate();
  const { page, id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageData, setMessageData] = useState({ message: '', color: 'black' });
  const [category, setCategory] = useState({ id: 0, name: '', description: '' });

  useEffect(() => {
    fetchDataItem(setCategory, setIsLoading, page, id, navigate);
  }, []);

  const handleSaveBtn = () => {
    if (category.name.trim() !== '') {
      handleSave('Category', category, setIsLoading, page, id, navigate, setShowMessage, setMessageData);
    } else {
      setMessageData({ message: 'Category name cannot be empty!', color: '#FF2400' });
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }
  };

  return (
    <div className='category-edit-page'>
      <Navbar />
      {showMessage && <ToastMessage messageData={messageData} />}
      {showConfirm && <DeleteConfirmation itemName='Category' item={category} setIsLoading={setIsLoading} page={page} id={id} navigate={navigate} setShowConfirm={setShowConfirm} setShowMessage={setShowMessage} setMessageData={setMessageData} />}
      {isLoading ? <h1 className='loading-screen'>Category Loading...</h1> : <div className='category'>
        <button onClick={() => handleTurnBack(navigate, page)} className='turn-back-btn'><FontAwesomeIcon icon={faAngleLeft} /></button>

        <h1 className='page-title'>Category</h1>

        <div className='input-row'>
          <h2>Name:</h2>
          <div className='input-area'>
            <input id='category-name'
              placeholder='Category Name'
              type="text" value={category.name}
              onChange={(e) => { handleInput(e, setCategory) }} />
          </div>
        </div>

        <div className='input-row'>
          <h2>Description:</h2>
          <div className='input-area'>
            <textarea id='category-description'
              placeholder='Category Description'
              type="text" value={category.description}
              onChange={(e) => { handleInput(e, setCategory) }} />
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

export default CategoryEdit;