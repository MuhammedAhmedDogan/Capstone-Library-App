import React, { createContext, useState } from 'react';

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
    
    const [categories, setCategories] = useState([]);

    return (
        <StateContext.Provider value={{ categories, setCategories }}>
            {children}
        </StateContext.Provider>
    );
};
