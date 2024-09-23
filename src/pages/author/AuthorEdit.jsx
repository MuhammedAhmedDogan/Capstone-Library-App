import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { handleTurnBack, handleInput, handleSave, fetchDataItem } from './../../utils/helpers';
import Navbar from './../../components/Navbar';
import DeleteConfirmation from './../../components/DeleteConfirmation';
import ToastMessage from './../../components/ToastMessage';
import './../../css/authorEditStyle.css';

const AuthorEdit = () => {
    const navigate = useNavigate();
    const { page, id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [messageData, setMessageData] = useState({ message: '', color: 'black' });
    const [author, setAuthor] = useState({ id: 0, name: '', birthDate: '', country: '' });

    useEffect(() => {
        fetchDataItem(setAuthor, setIsLoading, page, id, navigate);
    }, []);

    useEffect(() => {
        setAuthor((prevItem) => {
            if (prevItem.birthDate === '0001-01-01') {
              return { ...prevItem, birthDate: '' };
            }
            return prevItem;
          });
    }, [isLoading]);

    const handleSaveBtn = () => {
        if (author.name.trim() !== '') {
            if (author.birthDate === '') {
                const newAuthor = { ...author, birthDate: '0001-01-01' };
                handleSave('Author', newAuthor, setIsLoading, page, id, navigate, setShowMessage, setMessageData);
            } else {
                handleSave('Author', author, setIsLoading, page, id, navigate, setShowMessage, setMessageData);
            };
        } else {
            setMessageData({ message: 'Author name cannot be empty!', color: '#FF2400' });
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 2000);
        };
    };

    return (
        <div className='author-edit-page'>
            <Navbar />
            {showMessage && <ToastMessage messageData={messageData} />}
            {showConfirm && <DeleteConfirmation itemName='Author' item={author} setIsLoading={setIsLoading} page={page} id={id} navigate={navigate} setShowConfirm={setShowConfirm} setShowMessage={setShowMessage} setMessageData={setMessageData} />}
            {isLoading ? <h1 className='loading-screen'>Author Loading...</h1> : <div className='author'>
                <button onClick={() => handleTurnBack(navigate, page)} className='turn-back-btn'><FontAwesomeIcon icon={faAngleLeft} /></button>

                <h1 className='page-title'>Author</h1>

                <div className='input-row'>
                    <h2>Name:</h2>
                    <div className='input-area'>
                        <input id='author-name'
                            placeholder='Author Name'
                            type="text" value={author.name}
                            autoComplete='off'
                            onChange={(e) => { handleInput(e, setAuthor) }} />
                    </div>
                </div>

                <div className='input-row'>
                    <h2>Birth Date:</h2>
                    <div className='input-area'>
                        <input id='author-birthDate'
                            placeholder='Author Birth Date'
                            type="date" value={author.birthDate}
                            onChange={(e) => { handleInput(e, setAuthor) }} />
                    </div>
                </div>

                <div className='input-row'>
                    <h2>Country:</h2>
                    <div className='input-area'>
                        <input id='author-country'
                            placeholder='Author Country'
                            type="text" value={author.country}
                            autoComplete='off'
                            onChange={(e) => { handleInput(e, setAuthor) }} />
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

export default AuthorEdit;