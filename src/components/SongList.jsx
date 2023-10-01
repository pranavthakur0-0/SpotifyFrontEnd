import { forwardRef, memo, useMemo, useState } from "react";
import Equizlier from "./Equilizer";
import { useMenu, useSong } from "../context/contextProvider";
import { useCookies } from "react-cookie";
import {  authenticatedPostRequest } from "../utils/ServerHelpers";
import { formatTime  } from "../MusicPlayer/MusicPlayer";
import { listThumbnail } from "../utils/ImageResizer";
import { formatDate } from "../utils/basicUtils";
import DialogMenu from "./BasicComponent/DialogMenu";
import MusicChangerStable from "../pattern/MusicChangerStable";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const SongList = forwardRef(({currentPlaylist, openDialogIndex, handleOpenDialog, item, index, divWidth, id}, ref) => {
    const currentSong =  useSelector(state=>state.Songs.currentSong);
    const { pauseAndPlay, favList } = useSong();
    const [isHovered, setIsHovered] = useState(false);
    const { toastMessage, toastColor, toastBool } = useMenu();
    const [Cookie,] = useCookies(['userId']);
    const currentPlaylistofredux = useSelector(state=>state.Songs.currentPlaylist);
    const location =  useLocation();
  
    // const fetchartist = useMemo(() => {
    //   return async () => {
    //     const route = `/artistInfo/${currentSong.artist}`;
    //     const response = await authenticatedGetRequest(route, Cookie);
    //     if (response) {
    //       // setartist(response);
    //     }
    //   };
    // }, [currentSong, Cookie]);
    //  useEffect(()=>{
    //      if(currentSong){
    //          fetchartist();
    //      }
    //      // eslint-disable-next-line
    //  },[currentSong]);


     const AddtoLikedSong = useMemo(() => {
      return async (e) => {
        e.stopPropagation();
        const route = "/likedSong";
        const response = await authenticatedPostRequest(route, Cookie, item);
        if (response.success) {
          favList.setfavId(response.data);
          toastMessage.setMessage(response.msg);
          toastColor.setColor('--essential-announcement');
          toastBool.setPopUp();
        }
      };
    }, [Cookie, item, favList, toastMessage, toastColor, toastBool]);

     const checkerTosetColorofIndex = useMemo(() => {
      let pass = false;
      if(location.pathname.includes("collection") && currentPlaylistofredux?._id === "collection"  ){
        pass = true;
      }
    
      return id === currentPlaylistofredux?._id ? (currentSong?._id === item?._id && (id === currentPlaylistofredux?._id)) : (currentSong?._id === item?._id && pass);
    }, [currentPlaylistofredux, currentSong, item, id, location]);




    return (
       item?._id ? 
           <div
            onMouseEnter={e=>setIsHovered(true)}
            onMouseLeave={e=>setIsHovered(false)} 
            className={`${item?._id === currentSong?._id && checkerTosetColorofIndex ? "bg-[var(--track-list-playing)]" : null} hover:bg-[var(--track-list)] py-2 px-3 cursor-pointer text-[var(--dark-text)] rounded-[0.25rem]`}>
            <div className={`grid music-grid text-[0.8rem]  font-spotifyBook text-[var(--dark-text)`} key={item?.id}>

          <span className={`flex items-center text-base ${currentSong?._id === item?._id  ? "text-primary": "text-white"}`}>

          <span className={`flex items-center text-base ${currentSong?._id === item?._id ? "text-primary": "text-white"}`}>
                <MusicChangerStable  currentPlaylist={currentPlaylist} item={item}>
                    <div className={`h-6 w-6 flex justify-center items-center ${checkerTosetColorofIndex ? "text-primary" : "text-white"}`}> 
                      {pauseAndPlay?.isPlaying && currentSong?._id === item?._id  && checkerTosetColorofIndex ? ( isHovered ? ( <svg role="img" height="17" width="17" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon"> <path fill="white" d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg> ) : ( <Equizlier /> ) ) : isHovered ?  ( <svg role="img" height="17" width="17" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon"> <path fill="white" d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z" ></path> </svg>) : index}
                    </div> 
             </MusicChangerStable>
          </span>
            </span>
            <div className="flex flex-row">
              <img src={listThumbnail(item?.thumbnail)} className="h-10 w-10 mr-4 object-cover" alt="img" />
              <div className="pr-2 flex flex-col justify-center">
                <div className="flex items-center text-[0.85rem] relative music-grid-span">
                  <div className={`music-grid-span ${checkerTosetColorofIndex && currentSong?._id === item?._id ? "text-primary" : "text-white"} hover:underline`} style={{width : `${divWidth - 40}px`}}>
                    {item?.name}
                  </div>
                </div>
              </div>
            </div>
          <span className="items-center hidden remove md:flex">{item?.album}asdfasdf</span>
          <span className="items-center hidden remove md:flex">{formatDate(item?.timestamp)}</span>
          <span className=" flex items-center gap-1">
                <div className="ml-2">
                <button onClick={AddtoLikedSong}>
                   {favList?.favId && favList?.favId.includes(item?._id) ? 
                      <svg className="mt-1" role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon"><path className="fill-primary" d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"></path></svg> 
                    : <div className=" h-3 w-3">{ isHovered ? <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon"><path className="fill-[--dark-text]" d="M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782 3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.463L1.348 8.309A4.582 4.582 0 0 1 1.689 2zm3.158.252A3.082 3.082 0 0 0 2.49 7.337l.005.005L7.8 13.664a.264.264 0 0 0 .311.069.262.262 0 0 0 .09-.069l5.312-6.33a3.043 3.043 0 0 0 .68-2.573 3.118 3.118 0 0 0-2.551-2.463 3.079 3.079 0 0 0-2.612.816l-.007.007a1.501 1.501 0 0 1-2.045 0l-.009-.008a3.082 3.082 0 0 0-2.121-.861z"></path></svg> : null}</div>}
                </button> 
              </div>
              <div className="pl-2 flex-1 justify-center flex">{formatTime(item?.duration)}</div>
              <div className="relative">
                <button className="p-1 cursor-pointer z-50" onClick={(e) => handleOpenDialog(e,index)}>
                   {openDialogIndex === index && openDialogIndex !== undefined ? <div ref={ref}><DialogMenu currentPlaylist={currentPlaylist} songItem={item??item} song={true} /></div> : null}
                    <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" className=" fill-white"><path d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path></svg>
                  </button>
              </div>
          </span>
             </div>
        </div>
     : null  
        )
});

export default  memo(SongList);

//<span className="flex items-center hover:underline">{item.artistName}asdfasdf</span>