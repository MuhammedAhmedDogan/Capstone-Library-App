import { useEffect, useContext } from 'react';
import { StateContext } from './../../context/StateContext';
import { getCategories } from './../../services/category_service';
import Navbar from './../../components/Navbar';
import './../../css/categoryStyle.css';

const Category = () => {
    const { categories, setCategories } = useContext(StateContext);

    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesData = await getCategories();
            setCategories(categoriesData);
        };
        fetchCategories();
    }, []);

    return (
        <div className='category-page'>
            <Navbar />
            <div className='category-list'>
                <h1>Categories</h1>
                <div className='category-titles'>
                    <h2>Name</h2>
                    <h2>Description</h2>
                    <h2>Actions</h2>
                </div>
                {categories.map(item => (
                    <div key={item.id} className='category-card'>
                        <h2>{item.name}</h2>
                        <h2>{item.description}</h2>
                        <button>View / Edit</button>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Category