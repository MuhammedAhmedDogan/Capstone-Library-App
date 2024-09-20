import { useEffect, useContext } from 'react';
import { StateContext } from './../../context/StateContext';
import { getCategories } from './../../services/category_service';

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
        <>
            {categories.map(item => (
                <div key={item.id}>
                    <h1>{item.id}</h1>
                    <h1>{item.name}</h1>
                    <h1>{item.description}</h1>
                </div>
            ))}
        </>
    )
}

export default Category