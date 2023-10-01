import { memo, useState } from "react"
import { Link, useLocation } from 'react-router-dom';
import likedSongImg from "../images/liked.png"
import { useSideBar } from "../context/sidebarProvider";
import { usePlaylist, useSong } from "../context/contextProvider";
import { useSelector } from "react-redux";

function PlaylistSidebar(){
    const location = useLocation();
    const {SideBarList} = useSideBar();
    const [change, setchange] = useState(true);
    const {favList} = useSong();
    const {imgPreview} = usePlaylist();
    const { pauseAndPlay } = useSong();
    const currentReduxPlaylist =  useSelector(state=>state.Songs.currentPlaylist);
    
    return (<>
            <div className="h-[48px] bg-[var(--background-base)] px-6 flex text-[0.83rem] font-spotifyLight tracking-wider items-center">
                <span className="bg-[var(--background-tinted-base)] mb-2 px-[0.8rem] rounded-full py-[0.4rem]">Playlist</span>
            </div>
            <div className="bg-[var(--background-base)] px-4 flex items-center text-sm">
                <div onClick={e=>setchange(false)} className={change ? "h-[48px] flex items-center mb-1" : 'mb-1 flex items-center h-[48px] overflow-hidden '}>
                   <div className={change ? "cursor-pointer p-2 rounded-full hover:bg-[var(--background-tinted-base)] h-[32px]" : ' rounded-l-[0.3rem] p-2 bg-[var(--background-tinted-base)] h-[32px]'}>
                    <svg role="img" height="16" width="16"  aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon"><path className="fill-[var(--dark-text)]" d="M7 1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zM.25 7a6.75 6.75 0 1 1 12.096 4.12l3.184 3.185a.75.75 0 1 1-1.06 1.06L11.304 12.2A6.75 6.75 0 0 1 .25 7z"></path></svg>
                </div>
                    {change ? null : <input type="text"  placeholder="Search in Your Library" className={`text-[0.8rem] h-[32px] font-spotifyBook ${change ? null : "bg-[var(--background-tinted-base)] rounded-r-[0.3rem] outline-none p-1"}`} />}
                </div>
            </div>
                <div className="h-full rounded-b-md bg-[var(--background-base)] my_scroll_div_X_not_hidden"> 
                    <div className="px-2 flex flex-col gap-2">
                    {/* //style={{backgroundColor : (location.pathname.includes(item._id) ? '#ffffff12' : "" )}}>  */}
                        {favList.favId && favList.favId.length > 0 ? <Link to={"/collection"}>
                            <div  className="flex items-center gap-2 p-2 rounded-md hover:bg-[var(--background-tinted-playlist)] cursor-pointer"  style={{backgroundColor : (location.pathname.includes("/collection") ? '#ffffff12' : "" )}}> 
                                    <div className="flex w-[48px] h-[48px]"><img className=" object-cover rounded-md w-full" src={likedSongImg} alt="likedSong" /></div>
                                    <div className="flex flex-col">
                                    <span className=" font-spotifyLight">Liked Songs</span>
                                    <span className=" flex text-[0.82rem] font-spotifyLight tracking-wide text-[var(--dark-text)]"> <span className="mr-2 flex justify-center items-center"><svg role="img" height="12" width="12" aria-hidden="false" viewBox="0 0 16 16" data-encore-id="icon"><title>Pinned</title><path className="fill-primary" d="M8.822.797a2.72 2.72 0 0 1 3.847 0l2.534 2.533a2.72 2.72 0 0 1 0 3.848l-3.678 3.678-1.337 4.988-4.486-4.486L1.28 15.78a.75.75 0 0 1-1.06-1.06l4.422-4.422L.156 5.812l4.987-1.337L8.822.797z"></path></svg></span> Playlist  •  {favList.favId.length} song</span>
                                </div>
                        </div>
                        </Link>
                         :
                          null }
                        {SideBarList.listInfo?.map((item, index)=>{
                            return ( <Link onClick={()=>imgPreview.setPreview(false)} to={`/playlist/${item._id}`} key={index}>
                                    <div  className="flex items-center justify-between gap-2 p-2 rounded-md hover:bg-[var(--background-tinted-playlist)] cursor-pointer"  style={{backgroundColor : (location.pathname.includes(item._id) ? '#ffffff12' : "" )}}> 
                                <div className="flex gap-2">  {item.thumbnail ? <div className="flex w-[48px] h-[48px]"><img className=" object-cover rounded-md w-full" src={item.thumbnail} alt="" /></div> :  
                                  <div className="p-3 bg-[var(--background-tinted-base)] rounded-[0.25rem]">
                                   <svg role="img" height="24" width="24" aria-hidden="true" data-testid="playlist"  viewBox="0 0 24 24" data-encore-id="icon"><path className="fill-[var(--dark-text)]" d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path></svg>
                                   </div>}
                                <div className="flex flex-col">
                                    <span className=" font-spotifyLight">{item.name}</span>
                                    <span className=" text-[0.82rem] font-spotifyLight tracking-wide text-[var(--dark-text)]">{item.type}  •  {item.username}</span>
                                </div></div>
                               {pauseAndPlay?.isPlaying && currentReduxPlaylist?._id === item._id  ?  <svg role="img" height="16" width="16" aria-hidden="true" className="fill-primary" viewBox="0 0 16 16" data-encore-id="icon"><path d="M10.016 1.125A.75.75 0 0 0 8.99.85l-6.925 4a3.639 3.639 0 0 0 0 6.299l6.925 4a.75.75 0 0 0 1.125-.65v-13a.75.75 0 0 0-.1-.375zM11.5 5.56a2.75 2.75 0 0 1 0 4.88V5.56z"></path><path d="M16 8a5.752 5.752 0 0 1-4.5 5.614v-1.55a4.252 4.252 0 0 0 0-8.127v-1.55A5.752 5.752 0 0 1 16 8z"></path></svg> :  null}
                        </div>
                        
                        </Link> )
                    })}
                </div>
                </div>
    </>)

}


export default memo(PlaylistSidebar);