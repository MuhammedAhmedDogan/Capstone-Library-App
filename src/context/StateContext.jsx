import React, { createContext, useState } from 'react';

export const StateContext = createContext();

export const StateProvider = ({ children }) => {

    const [categories, setCategories] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [authors, setAuthors] = useState([]);

    return (
        <StateContext.Provider value={{ categories, setCategories, publishers, setPublishers, authors, setAuthors }}>
            {children}
        </StateContext.Provider>
    );
};
