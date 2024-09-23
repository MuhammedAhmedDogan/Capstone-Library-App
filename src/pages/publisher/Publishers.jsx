import { useEffect, useContext, useState } from 'react';
import { StateContext } from './../../context/StateContext';
import { fetchDataList, goToEditPage } from './../../utils/helpers';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './../../css/listPageStyles.css';

const Publishers = () => {
  const navigate = useNavigate();
  const { page } = useParams();
  const { publishers, setPublishers } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDataList(setPublishers, setIsLoading, page, navigate);
  }, []);

  useEffect(() => {
    const editedItems = publishers.map(item => {
      if (item.establishmentYear === -12345) {
        return { ...item, establishmentYear: '' };
      }
      return item;
    });
    setPublishers(editedItems);
  }, [isLoading]);

  return (
    <div className='list-page'>
      <Navbar />
      {isLoading ? <h1 className='loading-screen'>Publishers Loading...</h1> : <div className='list-container'>
        <h1 className='page-title'>Publishers</h1>
        <div className='list-titles'>
          {publishers.length !== 0 && <div className='publisher-title-informations'>
            <h2>Name</h2>
            <h2>Establishment Year</h2>
            <h2>Address</h2>
          </div>}
          <button className='add-btn' onClick={() => goToEditPage(0, page, navigate)}>Add New Publisher</button>
        </div>
        {publishers.map(item => (
          <div key={item.id} className='item-card'>
            <div className='publisher-informations'>
              <h2>{item.name}</h2>
              <h2>{item.establishmentYear}</h2>
              <h2>{item.address}</h2>
            </div>
            <button className='view-btn' onClick={() => goToEditPage(item.id, page, navigate)}>View / Edit</button>
          </div>
        ))}
      </div>}
    </div>
  )
}

export default Publishers;