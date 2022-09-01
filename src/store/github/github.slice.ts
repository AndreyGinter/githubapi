import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

const LS_FAV_KEY = 'favourite_key';

interface GithubState {
    favourites: string[]
}

const initialState: GithubState = {
    favourites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]'),
};

export const githubSlice = createSlice({
    name: 'github',
    initialState,
    reducers: {
        addFavourite(state, action: PayloadAction<string>) {
            state.favourites.push(action.payload);
            localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites));
        },
        removeFavourite(state, action: PayloadAction<string>) {
            state.favourites = state.favourites.filter(fav => fav !== action.payload);
            localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites));
        },
    },
});

export const githubActions = githubSlice.actions;
export const githubReducer = githubSlice.reducer;

export const getFavourites = (state: RootState) => state.github.favourites;
