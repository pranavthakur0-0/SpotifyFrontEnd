import { memo, useContext, useEffect, useState } from "react";
import { useMenu, useSong } from "../context/contextProvider";
import { useCookies } from "react-cookie";
import { authenticatedGetRequest, authenticatedPostRequest } from "../utils/ServerHelpers";
import { Playaudio, fetchAndDecodeAudio, formatTime, pauseAudio } from "../MusicPlayer/MusicPlayer";
import { listThumbnail } from "../utils/ImageResizer";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPlaylistDetails } from "./slice/QueueSlice";
import useMusicPlayerRefs from "./Refs/MusicRefs";
import { TimeContext } from "../pages/Home";
import { Stringify } from "../utils/StorageFun";

function SongListHome({item, index, divWidth, isFavorite, currentPlaylist}){
  const currentSong =  useSelector(state=>state.Songs.currentSong);
  
  const currentReduxPlaylist =  useSelector(state=>state.Songs.currentPlaylist);
  const dispatch = useDispatch();
  const { pauseAndPlay, favList } = useSong();
  const currentPlaylistofredux =  useSelector(state=>state.Songs.currentPlaylist);
    const [isHovered, setIsHovered] = useState(false);
    const { toastMessage, toastColor, toastBool } = useMenu();
    const { audioContextRef,audioElementRef, sourceNodeRef, grainNodeRef, bufferRef} = useMusicPlayerRefs();
    const [Cookie,] = useCookies('userId');
    const { startedAt, setstartedAt, setduration, sound, setpaused, setCurrentTime } = useContext(TimeContext);
     // eslint-disable-next-line 
    const [artist, setartist] = useState();

    const fetchartist = async()=>{
        const route = `/artistInfo/${currentSong.artist}`
        const response = await authenticatedGetRequest(route,Cookie);
        if(response){
            setartist(response);
        }
    }
    useEffect(()=>{
        if(currentSong){
            fetchartist();
        }
        // eslint-disable-next-line
    },[currentSong]);


    const AddtoLikedSong = async(e)=>{
        const route = "/likedSong"
        const response = await authenticatedPostRequest(route, Cookie, item);
        if(response.success){
            favList.setfavId(response.data); 
             toastMessage.setMessage(response.msg);
             toastColor.setColor('--essential-announcement');
             toastBool.setPopUp();
        }
    }

    useEffect(()=>{
      console.log(currentReduxPlaylist);
    },[currentReduxPlaylist])

    const handleSong = ()=>{
        if(currentPlaylistofredux?._id !== "search") {
          dispatch(setCurrentPlaylistDetails(currentPlaylist));
          setCurrentTime(0);
          setstartedAt(0); 
          fetchAndDecodeAudio(audioContextRef, audioElementRef, sourceNodeRef, grainNodeRef, bufferRef, item, setduration, sound, Cookie);
          pauseAndPlay.setIsPlaying(true);
          setpaused(false);
          Stringify('paused', false);
   } else {
         if (pauseAndPlay.isPlaying) {
           pauseAudio( audioContextRef,audioElementRef, sourceNodeRef, setstartedAt, startedAt);
           pauseAndPlay.setIsPlaying(false);
           setpaused(true);
           Stringify('paused', true);
         } else {
           Playaudio( audioContextRef, audioElementRef, sourceNodeRef, grainNodeRef, bufferRef, sound, setstartedAt, startedAt);
           pauseAndPlay.setIsPlaying(true);
           setpaused(false);
           Stringify('paused', false);
         }
      }
    }

    return (

      item && item._id ? 
             <div
                    onClick={handleSong}
                    onMouseEnter={e => setIsHovered(true)}
                    onMouseLeave={e => setIsHovered(false)}
                    className={`${
                      currentSong?._id === item?._id
                        ? "bg-[var(--track-list-playing)]"
                        : null
                    } mb-1 hover:bg-[var(--track-list)] py-2 cursor-pointer text-[var(--dark-text)] rounded-[0.25rem] px-0 group`}
                  >
              <div className="pl-2 grid music-grid-home  text-[0.8rem]  font-spotifyBook text-[var(--dark-text)" key={item.id}>
                <span className={`flex items-center relative text-base ${currentSong?._id === item?._id  ? "text-primary": "text-white"}`}>
                <span className={`flex items-center text-base ${currentSong?._id === item?._id ? "text-primary": "text-white"} absolute w-0 left-3 z-40`}>
                    <div className="h-6 w-6 flex justify-center items-center"> 
                        {currentSong?._id === item?._id && pauseAndPlay.isPlaying  &&  currentPlaylistofredux?._id === "search" ? <svg role="img" height="17" width="17" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon"> <path fill="white" d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg> : isHovered ? <button> <svg role="img" height="17" width="17" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon"> <path fill="white" d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z" ></path> </svg></button>  :  ""}
                    </div>
                </span>
              </span>
              <div className="flex flex-row">
                <div className="mr-4 relative">
                  <div className={`w-full h-full group-hover:bg-black/60 absolute ${currentSong?._id === item?._id && pauseAndPlay.isPlaying &&  currentPlaylistofredux?._id === "search" ? "bg-black/60" : ""}`}></div>
                  <img  src={listThumbnail(item.thumbnail)} className="min-h-[2.5rem] min-w-[2.5rem] h-10 w-10 object-cover" alt="img" />
                </div>
                <div className="pr-2 flex flex-col justify-center">
                  <div className="flex items-center text-[0.85rem] relative music-grid-span">
                    <div className={`music-grid-span ${currentSong?._id === item?._id &&  currentPlaylistofredux?._id === "search" ? "text-primary" : "text-white"} hover:underline`} style={{width : `${divWidth - 40}px`}}>
                      {item.name}
                    </div>
                  </div>
                </div>
              </div>
            <span className=" flex items-center gap-3">
                  <div className={`ml-2 h-fit mt-1`}>
                    <button onClick={(e) => { 
                      e.stopPropagation();
                      AddtoLikedSong();
                    }}>
                      {isFavorite ? (
                        <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon">
                          <path className="fill-primary" d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"></path>
                        </svg>
                      ) : (
                        <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon">
                          <path className="fill-[--dark-text]" d="M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782 3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.463L1.348 8.309A4.582 4.582 0 0 1 1.689 2zm3.158.252A3.082 3.082 0 0 0 2.49 7.337l.005.005L7.8 13.664a.264.264 0 0 0 .311.069.262.262 0 0 0 .09-.069l5.312-6.33a3.043 3.043 0 0 0 .68-2.573 3.118 3.118 0 0 0-2.551-2.463 3.079 3.079 0 0 0-2.612.816l-.007.007a1.501 1.501 0 0 1-2.045 0l-.009-.008a3.082 3.082 0 0 0-2.121-.861z"></path>
                        </svg>
                      )}
                    </button>

                </div>
                <div className={`justify-center flex w-10`}>{formatTime(item.duration)}</div>
            </span>
               </div>
          </div>
     : null  
        )
}

export default  memo(SongListHome);
