import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "searchMovie",
    initialState: {
        movieName: "",
        searchedMovie: null
    },
    reducers: {
        setSearchMovieDetails: (state, action) => {
            state.movieName = action.payload.searchMovie;
            state.searchedMovie = action.payload.movies;
        },
        clearSearchMovieDetails: (state) => {
            state.movieName = "";
            state.searchedMovie = null;
        }
    }
});

export const { setSearchMovieDetails, clearSearchMovieDetails } = searchSlice.actions;
export default searchSlice.reducer; 