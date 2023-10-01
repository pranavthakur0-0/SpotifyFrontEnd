import React, { createContext, useContext, useMemo, useReducer } from "react";

const AuthContext = createContext(null);
const PlaylistContext = createContext(null);
const SongContext = createContext(null);
const MenuContext = createContext(null);
const UserContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function useMenu() {
  return useContext(MenuContext);
}

export function usePlaylist() {
  return useContext(PlaylistContext);
}

export function useSong() {
  return useContext(SongContext);
}

export function useUser() {
  return useContext(UserContext);
}


function reducer(state, action) {
  switch (action.type) {
    case "SET_AUTH_ID":
      return { ...state, authId: action.payload };
    
    case "SET_USER":
      return { ...state, user: action.payload };

    case "SET_EDIT_PLAYLIST":
      return { ...state, editPlaylist: action.payload };

    case "GET_SIDEBAR_LIST":
      return { ...state, sidebarPlaylistList: action.payload };

    case "SET_EDIT_PLAYLIST_MENU":
        return { ...state, editPlaylistMenu: action.payload }; 

    case "SET_SHOW":
      return { ...state, show: action.payload };

    case "SET_PLAYLIST":
      return { ...state, listInfo: action.payload };

    case "SET_PREVIEW":
      return { ...state, preview: action.payload };

    case "SET_MESSAGE":
      return { ...state, message: action.payload };

    case "SET_COLOR":
      return { ...state, color: action.payload };

    case "SET_UPDATED_PLAYLIST_IMG":
      return { ...state, updatedPlaylistImg: action.payload };

    case "SET_POP_UP":
      return { ...state, popUp: !state.popUp };

    case "SET_CURRENT_SONG":
        return { ...state, currentSong: action.payload };

    case "SET_LIKED_SONG_ID":
      return { ...state, favId: action.payload };

    case "SET_LIKED_SONG_INFO":
      return { ...state, likeInfo: action.payload };

    case "SET_QUEUE":
      return { ...state, queue: action.payload };

    case "SET_SHUFFLE":
      return { ...state, shuffle: action.payload };

    case "PAUSE_PLAY":
      return { ...state, isPlaying: action.payload };

    case  "SET_STARTED_SONG":
        return {...state, startedAt:action.payload};

    default:
      return state;
  }
}
export default function ContextProvider({ children }) {
  const initialState = {
    user:null,
    authId: null,
    editplaylist: null,
    editPlaylistMenu: null,
    sidebarPlaylistList : null,
    show: false,
    listInfo: null,
    preview: null,
    message: "",
    favId:null,
    likeInfo:null,
    color: null,
    updatedPlaylistImg: null,
    popUp: false,
    currentSong: null,
    likedSong: null,
    likedSongInfo: null,
    queue: null,
    shuffle: null,
    isPlaying: false,
    startedAt : 0,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const UserData = useMemo(
    () => ({
      user: state.user,
      setUser: (payload) => dispatch({ type: "SET_USER", payload }),
    }),
    [state.user]
  );


  const authValue = useMemo(
    () => ({
      authId: state.authId,
      setAuthId: (payload) => dispatch({ type: "SET_AUTH_ID", payload }),
    }),
    [state.authId]
  );


  // Editpalylist menu popup this playlist data is used for that

  const revisedPlaylist = useMemo(
    () => ({
      editPlaylist: state.editPlaylist, // Changed from editplaylist
      setEditPlaylist: (payload) =>
        dispatch({ type: "SET_EDIT_PLAYLIST", payload }), // Changed from editplaylist
    }),
    [state.editPlaylist] // Changed from editplaylist
  );

  const playlistMenu = useMemo(
    () => ({
      editPlaylistMenu: state.editPlaylistMenu,
      setEditPlaylistMenu: (payload) =>
        dispatch({ type: "SET_EDIT_PLAYLIST_MENU", payload }),
    }),
    [state.editPlaylistMenu]
  );

  const Playlist = useMemo(
    () => ({
      listInfo: state.listInfo,
      setlistInfo: (payload) => dispatch({ type: "SET_PLAYLIST", payload }),
    }),
    [state.listInfo]
  );

  const imgPreview = useMemo(
    () => ({
      preview: state.preview,
      setPreview: (payload) => dispatch({ type: "SET_PREVIEW", payload }),
    }),
    [state.preview]
  );

  const toastMessage = useMemo(
    () => ({
      message: state.message,
      setMessage: (payload) => dispatch({ type: "SET_MESSAGE", payload }),
    }),
    [state.message]
  );

  const toastColor = useMemo(
    () => ({
      color: state.color,
      setColor: (payload) => dispatch({ type: "SET_COLOR", payload }),
    }),
    [state.color]
  );

  const changePlaylistImg = useMemo(
    () => ({
      updatedPlaylistImg: state.updatedPlaylistImg,
      setUpdatedPlaylistImg: (payload) =>
        dispatch({ type: "SET_UPDATED_PLAYLIST_IMG", payload }),
    }),
    [state.updatedPlaylistImg]
  );

  const toastBool = useMemo(
    () => ({
      popUp: state.popUp,
      setPopUp: (payload) => dispatch({ type: "SET_POP_UP"}),
    }),
    [state.popUp]
  );

  const playingTrack = useMemo(
    () => ({
      currentSong: state.currentSong,
      setCurrentSong: (payload) => dispatch({ type: "SET_CURRENT_SONG", payload }),
    }),
    [state.currentSong]
  );

  const favList = useMemo(
    () => ({
      favId: state.favId,
      setfavId: (payload) => dispatch({ type: "SET_LIKED_SONG_ID", payload }),
    }),
    [state.favId]
  );

  const favTracks = useMemo(
    () => ({
      likeInfo: state.likeInfo,
      setLikeInfo: (payload) => dispatch({ type: "SET_LIKED_SONG_INFO", payload }),
    }),
    [state.likeInfo]
  );


  const songQueue = useMemo(
    () => ({
      queue: state.queue,
      setQueue: (payload) => dispatch({ type: "SET_QUEUE", payload }),
    }),
    [state.queue]
  );

  const songShuffle = useMemo(
    () => ({
      shuffle: state.shuffle,
      setShuffle: (payload) => dispatch({ type: "SET_SHUFFLE", payload }),
    }),
    [state.shuffle]
  );

  const pauseAndPlay = useMemo(
    () => ({
      isPlaying: state.isPlaying,
      setIsPlaying: (payload) => dispatch({ type: "PAUSE_PLAY", payload }), // Corrected from "ISPLAYLING"
    }),
    [state.isPlaying]
  );

  const startVal  = useMemo(()=>({
    startedAt : state.startedAt,
    setstartedAt : (payload) => dispatch({type : "SET_STARTED_SONG", payload}),
  }),
  [state.startedAt])
  
  return (
    <AuthContext.Provider value={authValue}>
      <UserContext.Provider value={UserData}>
      < PlaylistContext.Provider value={{ changePlaylistImg, imgPreview, Playlist }}>
        <MenuContext.Provider value={{ playlistMenu, toastColor, toastBool, toastMessage, revisedPlaylist,}} >
          <SongContext.Provider value={{ pauseAndPlay, songShuffle, songQueue, favTracks, playingTrack, favList, startVal }}>
            {children}
          </SongContext.Provider>
        </MenuContext.Provider>
        </PlaylistContext.Provider>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}
