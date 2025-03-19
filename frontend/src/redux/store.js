import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import myListReducer from "./myListSlice";
import searchReducer from "./searchSlice";

// Create the Redux store
const store = configureStore({
    reducer: {
        user: userReducer,
        movie: movieReducer,
        myList: myListReducer,
        searchMovie: searchReducer
    },
    // Add middleware options for better debugging
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: true
});

export default store;
