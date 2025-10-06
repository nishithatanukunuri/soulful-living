import React, { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const ComparisonContext = createContext();

export const ComparisonProvider = ({ children }) => {
    const [compareList, setCompareList] = useLocalStorage('compareList', []);

    const toggleCompare = (product) => {
        setCompareList((prevList) => {
            const isInList = prevList.some(item => item.id === product.id);
            if (isInList) {
                return prevList.filter(item => item.id !== product.id);
            } else {
                if (prevList.length >= 3) {
                    console.log("Comparison list is full (max 3 items).");
                    return prevList;
                }
                return [...prevList, product];
            }
        });
    };

    const clearCompareList = () => {
        setCompareList([]);
    };

    return (
        <ComparisonContext.Provider value={{ compareList, toggleCompare, clearCompareList }}>
            {children}
        </ComparisonContext.Provider>
    );
};