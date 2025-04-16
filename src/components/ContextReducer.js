import React, { createContext, useContext, useReducer } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const initialState = [];

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD': {
            const existingIndex = state.findIndex(
                item => item.id === action.item.id && item.size === action.item.size
            );

            if (existingIndex !== -1) {
                const updatedState = [...state];
                updatedState[existingIndex] = {
                    ...updatedState[existingIndex],
                    qty: parseInt(updatedState[existingIndex].qty) + parseInt(action.item.qty),
                    price: parseInt(updatedState[existingIndex].price) + parseInt(action.item.price)
                };
                return updatedState;
            } else {
                // New item
                return [...state, action.item];
            }
        }

        case 'UPDATE': {
            return state.map(item =>
                item.id === action.item.id && item.size === action.item.size
                    ? {
                        ...item,
                        qty: parseInt(item.qty) + parseInt(action.item.qty),
                        price: parseInt(item.price) + parseInt(action.item.price)
                    }
                    : item
            );
        }

        case 'REMOVE':
            return state.filter((_, index) => index !== action.index);

        case 'DROP':
            return [];

        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartStateContext.Provider value={state}>
            <CartDispatchContext.Provider value={dispatch}>
                {children}
            </CartDispatchContext.Provider>
        </CartStateContext.Provider>
    );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
