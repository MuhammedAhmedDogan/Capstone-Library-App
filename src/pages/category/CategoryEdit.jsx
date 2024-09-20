import Navbar from '../../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getById } from '../../services/api_service';
import './../../css/categoryEditStyle.css';

const CategoryEdit = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { page, id } = useParams();
  const [category, setCategory] = useState({ id: 0, name: '', description: '' });

  useEffect(() => {
    const fetchCategory = async () => {
      if (id === '0') {
        setCategory({ id: 0, name: '', description: '' })
        setIsLoading(false);
      } else {
        try {
          setIsLoading(true);
          const categoryData = await getById(page, id);
          setCategory(categoryData);
          setIsLoading(false);
        } catch (error) {
          navigate(`/${page}`)
        }
      }
    };
    fetchCategory();
  }, []);

  const handleInput = (e) => {
    const { id, value } = e.target;
    const key = id.split('-')[1];

    setCategory(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  const handleSave = () => {
    console.log(category)
  }

  const handleDelete = () => {
    console.log(category)
  }


  return (
    <div className='category-edit-page'>
      <Navbar />
      {isLoading ? <h1 className='loading-screen'>Category Loading...</h1> : <div className='category'>
        <h1>Category</h1>

        <div className='input-row'>
          <h2>Name:</h2>
          <div className='input-area'>
            <input id='category-name'
              placeholder='Category Name'
              type="text" value={category.name}
              onChange={(e) => { handleInput(e) }} />
          </div>
        </div>

        <div className='input-row'>
          <h2>Description:</h2>
          <div className='input-area'>
            <textarea id='category-description'
              placeholder='Category Description'
              type="text" value={category.description}
              onChange={(e) => { handleInput(e) }} />
          </div>
        </div>

        <div className='buttons'>
          <button onClick={handleDelete} className='delete-btn'>Delete</button>
          <button onClick={handleSave} className='save-btn'>Save</button>
        </div>

      </div>}

    </div>
  )
}

export default CategoryEdit