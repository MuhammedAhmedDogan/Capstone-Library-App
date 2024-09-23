import { useEffect, useContext, useState } from 'react';
import { StateContext } from './../../context/StateContext';
import { fetchDataList, goToEditPage } from './../../utils/helpers';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './../../components/Navbar';
import './../../css/listPageStyles.css';

const Categories = () => {
    const navigate = useNavigate();
    const { page } = useParams();
    const { categories, setCategories } = useContext(StateContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDataList(setCategories, setIsLoading, page, navigate)
    }, []);

    return (
        <div className='list-page'>
            <Navbar />
            {isLoading ? <h1 className='loading-screen'>Categories Loading...</h1> : <div className='list-container'>
                <h1 className='page-title'>Categories</h1>
                <div className='list-titles'>
                    {categories.length !== 0 && <div className='category-title-informations'>
                        <h2>Name</h2>
                        <h2>Description</h2>
                    </div>}
                    <button className='add-btn' onClick={() => goToEditPage(0, page, navigate)}>Add New Category</button>
                </div>
                {categories.map(item => (
                    <div key={item.id} className='item-card'>
                        <div className='category-informations'>
                            <h2>{item.name}</h2>
                            <h2>{item.description}</h2>
                        </div>
                        <button className='view-btn' onClick={() => goToEditPage(item.id, page, navigate)}>View / Edit</button>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default Categories;