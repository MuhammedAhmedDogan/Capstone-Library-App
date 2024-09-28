import { useEffect, useContext, useState } from 'react';
import { StateContext } from './../../context/StateContext';
import { fetchDataList, goToEditPage } from './../../utils/helpers';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './../../css/listPageStyles.css';

const Authors = () => {
  const navigate = useNavigate();
  const { page } = useParams();
  const { authors, setAuthors } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDataList(setAuthors, setIsLoading, page, navigate);
  }, []);

  useEffect(() => {
    const editedItems = authors.map(item => {
      if (item.birthDate === '0001-01-01') {
        return { ...item, birthDate: '' };
      }
      const date = new Date(item.birthDate);
      const formattedDate = date.toLocaleDateString();
      return { ...item, birthDate: formattedDate };
    });
    setAuthors(editedItems);
  }, [isLoading]);

  return (
    <div className='list-page'>
      <Navbar />
      {isLoading ? <h1 className='loading-screen'>Authors Loading...</h1> : <div className='list-container'>
        <h1 className='page-title'>Authors</h1>
        <div className='list-titles'>
          {authors.length !== 0 && <div className='author-title-informations'>
            <h2>Name</h2>
            <h2>Birth Date</h2>
            <h2>Country</h2>
          </div>}
          <button className='add-btn' onClick={() => goToEditPage(0, page, navigate)}>Add New Author</button>
        </div>
        {authors.map((item, index) => (
          <div key={item.id} className='item-card'>
            <div className='author-informations'>
              <h2 style={index % 2 === 0 ? { backgroundColor: '#E5E4E2' } : {}}>{item.name}</h2>
              <h2 style={index % 2 === 0 ? { backgroundColor: '#E5E4E2' } : {}}>{item.birthDate}</h2>
              <h2 style={index % 2 === 0 ? { backgroundColor: '#E5E4E2' } : {}}>{item.country}</h2>
            </div>
            <button style={index % 2 === 0 ? { backgroundColor: '#E5E4E2' } : {}} className='view-btn' onClick={() => goToEditPage(item.id, page, navigate)}>View / Edit</button>
          </div>
        ))}
      </div>}
    </div>
  )
}

export default Authors;