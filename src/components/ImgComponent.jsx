

import { memo, useContext, useEffect, useRef, useState } from "react"
import HoverPlaylistThumbnail from "./HoverPlaylistThumbnail.jsx"
import { NavbarContext } from "./Context";
import { useMenu } from "../context/contextProvider.js";
import { useSelector } from "react-redux";
function ImgComponent ({playlist}){
    const {setNavcolor} = useContext(NavbarContext);
    const [compHeight, setcompHeight] = useState(0);
    const {playlistMenu} = useMenu();
    
    // useEffect(()=>{
    //   console.log("asdfasdf");
    //   console.log(fillinfo);
    // },[fillinfo])
    const compRef = useRef();
    useEffect(()=>{
        setcompHeight(compRef.current?.clientHeight);
         // eslint-disable-next-line
    },[compRef.current?.clientHeight])   

    useEffect(()=>{
      if(playlist && playlist.bgcolor)
      {
        setNavcolor(playlist.bgcolor)
      }
       // eslint-disable-next-line
    },[playlist]);


    return (<>
        <div ref={compRef} className="w-full h-fit relative flex flex-col">
        <div className={`p-6 pt-0 w-full h-[22rem] bg-cover rounded-t-md flex items-end`} style={{backgroundColor : (playlist && playlist.bgcolor ? playlist.bgcolor : "var(--absent-background)")}}>
              <div className="relative mt-10 z-10">
                <HoverPlaylistThumbnail owner={playlist?.owner} thumbnail={playlist?.thumbnail}>
                </HoverPlaylistThumbnail>
              </div>
              <div className="ml-10 text-white z-10">
                <h5>Playlist</h5>

                <button className="relative -left-[0.5rem] text-[2rem] sm:text-[4rem] lg:text-[6rem] xl:text-[7rem] leading-none font-spotifyBlack tracking-tighter" onClick={() => playlistMenu.setEditPlaylistMenu(true)}>{playlist && playlist.name ? playlist.name : ""}</button>
                <p className="text-[var(--dark-text)] text-sm pt-4 font-spotifyBook">{playlist && playlist.description ? playlist.description : null }</p>
                <p className="text-white text-sm pt-4 font-spotifyBook">{playlist && playlist.username ? playlist.username : null }</p>
              </div>
            </div>
            <div className={`w-full h-48 image-mix-blend opacity-80 absolute z-10`} style={{top : `${compHeight}px`, backgroundColor : (playlist && playlist.bgcolor ? playlist.bgcolor : "")}}>
            </div>
            <div className="absolute h-full w-full top-0 backgroundOverlay"></div>
         </div>
    </>)

}

export default memo(ImgComponent);