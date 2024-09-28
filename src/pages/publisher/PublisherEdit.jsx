import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { handleTurnBack, handleInput, handleSave, fetchDataItem } from './../../utils/helpers';
import Navbar from './../../components/Navbar';
import DeleteConfirmation from './../../components/DeleteConfirmation';
import ToastMessage from './../../components/ToastMessage';
import './../../css/editPageStyles.css';

const PublisherEdit = () => {
    const navigate = useNavigate();
    const { page, id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [messageData, setMessageData] = useState({ message: '', color: 'black' });
    const [publisher, setPublisher] = useState({ id: 0, name: '', establishmentYear: '', address: '' });

    useEffect(() => {
        fetchDataItem(setPublisher, setIsLoading, page, id, navigate);
    }, [page, id]);

    useEffect(() => {
        setPublisher((prevItem) => {
            if (prevItem.establishmentYear === -12345) {
              return { ...prevItem, establishmentYear: '' };
            }
            return prevItem;
          });
    }, [publisher.establishmentYear]);

    const handleSaveBtn = () => {
        if (publisher.name.trim() !== '') {
            if (publisher.establishmentYear === '') {
                const newPublisher = { ...publisher, establishmentYear: -12345 };
                handleSave('Publisher', newPublisher, setIsLoading, page, id, navigate, setShowMessage, setMessageData);
            } else {
                handleSave('Publisher', publisher, setIsLoading, page, id, navigate, setShowMessage, setMessageData);
            }
        } else {
            setMessageData({ message: 'Publisher name cannot be empty!', color: '#FF2400' });
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 2000);
        }
    };

    return (
        <div className='item-edit-page'>
            <Navbar />
            <button onClick={() => handleTurnBack(navigate, page)} className='turn-back-btn'><FontAwesomeIcon icon={faAngleLeft} /></button>
            {showMessage && <ToastMessage messageData={messageData} />}
            {showConfirm && <DeleteConfirmation itemName='Publisher' item={publisher} setIsLoading={setIsLoading} page={page} id={id} navigate={navigate} setShowConfirm={setShowConfirm} setShowMessage={setShowMessage} setMessageData={setMessageData} />}
            {isLoading ? <h1 className='loading-screen'>Publisher Loading...</h1> : <div className='item'>
                <h1 className='page-title'>Publisher</h1>

                <div className='input-row'>
                    <h2>Name:</h2>
                    <div className='input-area'>
                        <input id='publisher-name'
                            placeholder='Publisher Name'
                            type="text" value={publisher.name}
                            autoComplete='off'
                            onChange={(e) => { handleInput(e, setPublisher) }} />
                    </div>
                </div>

                <div className='input-row'>
                    <h2>Establishment Year:</h2>
                    <div className='input-area'>
                        <input id='publisher-establishmentYear'
                            placeholder='Publisher Establishment Year'
                            type="number" value={publisher.establishmentYear}
                            autoComplete='off'
                            onChange={(e) => { handleInput(e, setPublisher) }} />
                    </div>
                </div>

                <div className='input-row'>
                    <h2>Address:</h2>
                    <div className='input-area'>
                        <textarea id='publisher-address'
                            placeholder='Publisher Address'
                            maxLength='250'
                            type="text" value={publisher.address}
                            autoComplete='off'
                            onChange={(e) => { handleInput(e, setPublisher) }} />
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

export default PublisherEdit;