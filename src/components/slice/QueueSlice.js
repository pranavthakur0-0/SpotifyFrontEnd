import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    previousQueue : [],
    nextQueue : [],
    currentSong : null,
    currentPlaylist : null,
    diverter : false,
}


export const QueueSlice = createSlice({
  name : 'Songs',
  initialState,
    reducers: {
      setNextQueue : (state, action)=>{
        state.nextQueue = action.payload;
      },
      setPreviousQueue : (state, action)=>{
        state.previousQueue = action.payload
      },
      SetcurrentSong : (state, action)=>{
          state.currentSong = action.payload;
      },
      SongShuffle : (state, action)=>{
      },
      setCurrentPlaylistDetails : (state, action)=>{
        state.currentPlaylist = action.payload;
      },
      setCurrentPlaylistTONUll : (state, action)=>{
        state.currentPlaylist = null;
      },
      setCurrentPlaylist : (state, action)=>{
        if(!action.payload){
          return {
            ...state,
            currentPlaylist: null,
            currentSong: null,
            nextQueue: [],
            previousQueue : [],
          };
        }else{
          if(state.currentPlaylist?._id !== action.payload?._id){
            const data = [...action.payload.songDetails];
            const firstSong = data.shift();
            return {
              ...state,
              currentPlaylist: action.payload,
              currentSong: firstSong,
              nextQueue: [...data], // Use the deep cloned array
              previousQueue: [],
            };
          }
        }
      },setdiverter : (state, action)=>{
        state.diverter = action.payload;
      },
    },
  });


  export const {PreviousSong, NextSong, SetcurrentSong, SongShuffle, setCurrentPlaylist, setNextQueue, setPreviousQueue, setCurrentPlaylistDetails, setCurrentPlaylistTONUll,  setdiverter} = QueueSlice.actions;
export default QueueSlice.reducer;