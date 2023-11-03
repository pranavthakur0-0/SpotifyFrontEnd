import React, { memo, useContext, useRef, useState } from "react";
import { useEffect } from "react";
import ImgComponent from "./ImgComponent";
import { useParams } from "react-router-dom";
import SongList from "../components/SongList.jsx"
import { NavbarContext} from "./Context";
import { useCookies } from "react-cookie";
import { authenticatedGetRequest } from "../utils/ServerHelpers";
import { useMenu, usePlaylist, useSong } from "../context/contextProvider";
import TwoClickMusicChanger from "../pattern/TwoClickMusicChanger.jsx"
import DefaultHeading from "../pattern/DefaultHeading";
import { useSelector } from "react-redux";
import MainPlayListButton from "../pattern/MainPlayListButton";
import { AiOutlineEllipsis } from "react-icons/ai";
import DialogPositioner from "./BasicComponent/DialogPositioner.jsx";
import PlaylistMenu from "./PlaylistMenu.jsx"

function Playlist(){
    const {setscrollNav} = useContext(NavbarContext);
    const {revisedPlaylist} = useMenu();
    const { Playlist } = usePlaylist();
    const { id } = useParams();
    const [Cookie,] = useCookies(['userId']);
    const [divWidth, setDivWidth] = useState(0);
    const { pauseAndPlay } = useSong();
    const currentPlaylist = useSelector(state=>state.Songs.currentPlaylist);
    const [menu, setmenu] = useState(false);
    const menuref = useRef();

     useEffect(() => {
     const route = `/playlist/${id}`;
     const fetchPlaylist = async () => {
        const response = await authenticatedGetRequest(route, Cookie);
            if(response){
                Playlist.setlistInfo(response);
            }
        };
         fetchPlaylist();
         // eslint-disable-next-line
       }, [id]);


       useEffect(()=>{
        revisedPlaylist.setEditPlaylist(Playlist.listInfo);
        // eslint-disable-next-line
       },[Playlist.listInfo])
       

    const handleScroll = ()=>{
        const scrollDiv = document.getElementById('scrollDivRef');
        const scrollDistance = scrollDiv.scrollTop;
        setscrollNav(scrollDistance);
    }



    useEffect(()=>{
        const component = document.getElementById('scrollDivRef');
        component.addEventListener('scroll', handleScroll);
        return ()=>    component.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line
    },[])


    useEffect(()=>{
      const handleClickOutside = (e) => {
        if (menuref.current && !menuref.current.contains(e.target)) {
          setmenu(false);
        }
      };
  
      document.addEventListener('click', handleClickOutside);
      return ()=> document.removeEventListener('click', handleClickOutside)
    },[])


    return ( <div className="flex relative h-full flex-col">
            <div className="h-full w-full">
                <ImgComponent id={id} playlist={Playlist.listInfo}/>     
                <div  className={` relative z-40 h-fit w-full`} >
                    <div className="p-6 flex gap-6 items-center">
                      {Playlist.listInfo && Playlist.listInfo.songs && Playlist.listInfo.songs.length > 0 ?
                       <React.Fragment>
                        <MainPlayListButton currentPlaylist={Playlist?.listInfo}>
                          <div className="p-[0.8rem] w-fit h-fit rounded-full bg-primary hover:scale-105 hover:bg-[var(--primary-background-highlight)] transition-transform ease-in-out cursor-pointer">
                          {pauseAndPlay?.isPlaying && currentPlaylist?._id === id ?<svg role="img" height="28" width="28" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" className="Svg-sc-ytk21e-0 haNxPq"><path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg> :  <svg role="img" height="28" width="28" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon"  ><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path></svg> }
                          </div>
                        </MainPlayListButton>

                     



                      </React.Fragment> :  null }
                      <button ref={menuref} onClick={e=>setmenu(true)} className=" text-4xl text-gray-400 cursor-pointer rounded-full relative h-fit hover:text-white"><AiOutlineEllipsis />
                            {menu ? <DialogPositioner>
                                        <PlaylistMenu setmenu={setmenu} />
                                    </DialogPositioner> : null}
                        </button>
                    </div>
                    <div className="py-3 px-12 grid music-grid text-sm font-spotifyLight text-[var(--dark-text)]">
                          {Playlist.listInfo  && Playlist.listInfo.songs &&  Playlist.listInfo.songs.length > 0 ?   <DefaultHeading setDivWidth={setDivWidth} /> : null}
                    </div>
                    <div className="px-8">
                        <div className="h-[0.5px] bg-[var(--essential-subdued)]"></div>
                    </div>
                         <div className="py-3 px-8 flex flex-col gap-1">
                          {Playlist?.listInfo?.songDetails  ? Playlist?.listInfo?.songDetails.map((item, index)=>{
                            return <TwoClickMusicChanger key={item?._id}>
                            {(props) => (
                              <SongList
                                id={id}
                                currentPlaylist={Playlist.listInfo}
                                divWidth={divWidth}
                                ref={props.buttonRef}
                                index={index + 1}
                                item={item}
                                openDialogIndex={props.openDialogIndex}
                                handleOpenDialog={props.handleOpenDialog}
                              />
                            )}
                          </TwoClickMusicChanger>
                          
                          }) : <div className="text-white w-full justify-center flex pt-12 text-lg">No Songs Found</div> }
                         </div>
                </div>
            </div>
    </div> )
}


export default memo(Playlist);