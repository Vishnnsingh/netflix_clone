import { createSlice } from '@reduxjs/toolkit';

const myListSlice = createSlice({
    name: 'myList',
    initialState: {
        items: []
    },
    reducers: {
        addToMyList: (state, action) => {
            // Check if the movie is already in the list
            const exists = state.items.some(item => item.id === action.payload.id);
            if (!exists) {
                state.items.push(action.payload);
            }
        },
        removeFromMyList: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearMyList: (state) => {
            state.items = [];
        }
    }
});

export const { addToMyList, removeFromMyList, clearMyList } = myListSlice.actions;
export default myListSlice.reducer; 