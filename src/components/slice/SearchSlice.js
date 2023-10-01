import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    songs : null,
    mainResult : null,
    playlist : null,

}

export const SearchSlice = createSlice({
    name : 'Search',
    initialState,
    reducers : {
        setMainResult: (state, action) => {
            state.mainResult = action.payload;
        },
        setSongs : (state, action) => {
            state.songs = action.payload;
        },
        setPlaylist : (state, action)=>{
            state.playlist = action.payload;
        },
        setAlbum : (state, action)=>{
            state.playlist = action.payload;
        }
    }
})


export const {setMainResult, setSongs} = SearchSlice.actions;
export default SearchSlice.reducer;