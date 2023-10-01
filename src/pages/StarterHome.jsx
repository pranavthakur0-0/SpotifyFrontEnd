import { useCookies } from "react-cookie";
import { useAuth, useMenu, useSong, useUser } from "../context/contextProvider";
import { authenticatedGetRequest } from "../utils/ServerHelpers";
import { memo, useCallback, useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import BottomLogin from "../components/BottomLogin.jsx";
import Homecomponent from "./Homecomponent.jsx";
import EditplaylistMenuPopUp from "../components/EditplaylistMenuPopUp.jsx";
import MusicPlayer from "../components/MusicPlayer.jsx";
import SidebarContextProvider from "../context/sidebarProvider";
import PopupComp from "../components/PopupComp.jsx"
import { TimeContext } from "./Home";
import { Playaudio, pauseAudio } from "../MusicPlayer/MusicPlayer";
import useMusicPlayerRefs from "../components/Refs/MusicRefs";
import { Stringify } from "../utils/StorageFun";

function StarterHome({children}) {
  const {authId, setAuthId } = useAuth();
  const [Cookie] = useCookies(["userId"]);
  const fetchUserIdRef = useRef();
  const {playlistMenu, toastBool} = useMenu();
  const [firstRenderDone, setFirstRenderDone] = useState(null);
  const [show, setshow] = useState(null);
  const isFirstRender = useRef(true);
  const { setUser} = useUser();
  const { pauseAndPlay } = useSong();
  const {startedAt, setstartedAt, sound, setpaused } = useContext(TimeContext);
  const {
    audioContextRef,
    sourceNodeRef,
    grainNodeRef,
    bufferRef
  } = useMusicPlayerRefs();

  fetchUserIdRef.current = async () => {
    if (Cookie) {
      const route = "/auth/verifyUser";
      const response = await authenticatedGetRequest(route, Cookie);
      if (response.user) {
     
        setAuthId(response.user);
      }
    }
  };

  const fetchUserDetails = async () => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const route = `/profile/${authId}`;
    const response = await authenticatedGetRequest(route, Cookie);
    if (response.user) {
      setUser(response.user);
    }
  };

  useEffect(()=>{
    fetchUserDetails();
  // eslint-disable-next-line
  },[authId])

  useEffect(() => {
    if (firstRenderDone) {
      setshow(true);
      const timeoutId = setTimeout(() => {
      setshow(false);
      }, 4000);
      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      setFirstRenderDone(true);
    }
    // eslint-disable-next-line
  }, [toastBool.popUp]);

  useEffect(() => {
    fetchUserIdRef.current();
  }, [Cookie]);

  const pausePlayButton = useCallback((e) => {
    if (e.target.tagName.toLowerCase() !== 'input') {
      if (e.keyCode === 32) {
        if (pauseAndPlay.isPlaying) {
          pauseAudio(audioContextRef, sourceNodeRef, setstartedAt, startedAt);
          pauseAndPlay.setIsPlaying(false);
          setpaused(true);
          Stringify('paused', true);
        } else {
          Playaudio(audioContextRef, sourceNodeRef, grainNodeRef, bufferRef, sound, setstartedAt, startedAt);
          pauseAndPlay.setIsPlaying(true);
          setpaused(false);
          Stringify('paused', false);
        }
        e.preventDefault();
      }
    }
  }, [pauseAndPlay, audioContextRef, sourceNodeRef, grainNodeRef, bufferRef, sound, startedAt, setstartedAt, setpaused]);


  useEffect(()=>{
    document.addEventListener('keydown', pausePlayButton, true);
   return ()=>{
      document.removeEventListener('keydown', pausePlayButton, true);
    }
  },[pausePlayButton]);


  return (
    <div className="h-screen w-screen p-2 bg-black">
     <div className="relative w-full h-full flex flex-col">
        <div className="h-full bg-black flex overflow-scroll">
          <SidebarContextProvider>
              <Sidebar />
              <Homecomponent />
           </SidebarContextProvider>
        </div>
        
        {Cookie.userId ? <MusicPlayer /> : <BottomLogin />}
      </div>
      {show ? (<PopupComp ></PopupComp>) : null}
      {playlistMenu.editPlaylistMenu ? <EditplaylistMenuPopUp /> : null} 
    </div>
  );
}

export default memo(StarterHome);          
