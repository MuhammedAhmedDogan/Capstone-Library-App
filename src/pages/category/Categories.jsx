import { useEffect, useContext, useState } from 'react';
import { StateContext } from './../../context/StateContext';
import { fetchDataList, goToEditPage } from './../../utils/helpers';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './../../components/Navbar';
import './../../css/categoriesStyle.css';

const Categories = () => {
    const navigate = useNavigate();
    const { page } = useParams();
    const { categories, setCategories } = useContext(StateContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDataList(setCategories, setIsLoading, page, navigate)
    }, []);

    return (
        <div className='categories-page'>
            <Navbar />
            {isLoading ? <h1 className='loading-screen'>Categories Loading...</h1> : <div className='category-list'>
                <h1 className='page-title'>Categories</h1>
                <div className='category-titles'>
                    <div className='title-informations'>
                        <h2>Name</h2>
                        <h2>Description</h2>
                    </div>
                    <h2>Actions</h2>
                    <button className='add-btn' onClick={() => goToEditPage(0, page, navigate)}>Add New Category</button>
                </div>
                {categories.map(item => (
                    <div key={item.id} className='category-card'>
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