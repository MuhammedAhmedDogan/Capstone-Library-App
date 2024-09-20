import { useEffect, useContext, useState } from 'react';
import { StateContext } from '../../context/StateContext';
import { getList } from '../../services/api_service';
import Navbar from '../../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import './../../css/categoriesStyle.css';

const Categories = () => {
    const navigate = useNavigate();
    const { page } = useParams();
    const { categories, setCategories } = useContext(StateContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setIsLoading(true);
                const categoriesData = await getList(page);
                categoriesData.sort((a, b) => a.id - b.id);
                setCategories(categoriesData);
                setIsLoading(false);
            } catch (error) {
                console.error("Error processing data:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleEdit = (id) => {
        navigate(`/${page}/${id}`);
    };

    return (
        <div className='categories-page'>
            <Navbar />
            {isLoading ? <h1 className='loading-screen'>Categories Loading...</h1> : <div className='category-list'>
                <h1>Categories</h1>
                <div className='category-titles'>
                    <div className='title-informations'>
                        <h2>Name</h2>
                        <h2>Description</h2>
                    </div>
                    <h2>Actions</h2>
                    <button className='add-btn' onClick={() => handleEdit(0)}>Add New Category</button>
                </div>
                {categories.map(item => (
                    <div key={item.id} className='category-card'>
                        <div className='category-informations'>
                            <h2>{item.name}</h2>
                            <h2>{item.description}</h2>
                        </div>
                        <button className='view-btn' onClick={() => handleEdit(item.id)}>View / Edit</button>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default Categories