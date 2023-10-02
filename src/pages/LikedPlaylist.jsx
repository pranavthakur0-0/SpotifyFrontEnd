import React, { memo,  useCallback,  useEffect, useRef } from "react";
import { useState } from "react";
import SongList from "../components/SongList.jsx"
import LikedPlaylisticon from "../images/liked-songs-640.png"
import { useSong, useUser } from "../context/contextProvider";
import TwoClickMusicChanger from "../pattern/TwoClickMusicChanger.jsx"
import DefaultHeading from "../pattern/DefaultHeading.jsx";
import MainPlayListButton from "../pattern/MainPlayListButton.jsx";
import { authenticatedGetRequest } from "../utils/ServerHelpers.js";
import { debounce } from "../utils/basicUtils.js";
import { useCookies } from "react-cookie";
function LikedPlaylist(){
  const { favList, favTracks } = useSong();
  const compRef = useRef(null);
  const [divWidth, setDivWidth] = useState(0);
  const { user } = useUser();
  const [Cookie,] = useCookies(['userId']);
  // eslint-disable-next-line
  const debouncedFetchDataLikedList = useCallback(
    debounce(async () => {
      const route = "/likedSong";
      const response = await authenticatedGetRequest(route, Cookie);
      console.log(response);
      favTracks.setLikeInfo(response.result);
    }, 200),
    [Cookie, favList.favId]
  );
  useEffect(() => {
    if(Cookie){
      debouncedFetchDataLikedList();
    }
     // eslint-disable-next-line
  }, []);


    return ( <div className="flex relative h-full flex-col">
                <div className="h-full w-full">
                <div ref={compRef} className="bg-[#5038A0] p-6 pt-0 w-full h-[22rem] bg-cover rounded-t-md relative  flex items-end">
                    <div className="lg:w-[232px] lg:h-[232px] w-[192px] h-[192px] bg-black">
                            <img src={`${LikedPlaylisticon}`} className=" lg:w-[232px] lg:h-[232px] w-[192px] h-[192px] object-cover relative z-10" style={{boxShadow: `0 4px 60px rgba(0,0,0,.5)`}} alt="" />
                    </div>
                    
                    <div className="ml-10 text-white z-10">
                      <h5>Playlist</h5>
                      <h2 className="relative -left-[0.5rem] text-[2rem] sm:text-[4rem] lg:text-[6rem] xl:text-[7rem] leading-none font-spotifyBlack tracking-tighter">Liked Songs</h2>
                    <p className="text-white text-sm pt-4 font-spotifyBook">{user && user.username ? user.username : null }</p> 
                    </div>
                    <div className="absolute h-full w-full top-0 backgroundOverlay left-0"></div>

                </div>

                <div  className={` relative z-40 h-fit w-full`} >
                    <div className="p-6 flex gap-6 items-center">
                    <div className="w-full h-48 image-mix-blend opacity-80 absolute top-0 left-0 -z-10 bg-[#5038A0]"></div>
                    {favList.favId && favList.favId.length > 0 ? <React.Fragment>
                      <MainPlayListButton currentPlaylist={{
                                  _id: "collections",
                                  songDetails: favTracks.likeInfo,
                                }}>
                        <div className="p-[0.8rem] w-fit h-fit rounded-full bg-primary hover:scale-105 hover:bg-[var(--primary-background-highlight)] transition-transform ease-in-out cursor-pointer">
                            <svg role="img" height="28" width="28" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon"  ><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path></svg>
                        </div>
                    </MainPlayListButton>
                        <div><svg role="img" height="32" width="32" aria-hidden="true" viewBox="0 0 24 24" className="group cursor-pointer" data-encore-id="icon"><path  className="fill-[var(--dark-text)] group-hover:fill-white" d="M5.21 1.57a6.757 6.757 0 0 1 6.708 1.545.124.124 0 0 0 .165 0 6.741 6.741 0 0 1 5.715-1.78l.004.001a6.802 6.802 0 0 1 5.571 5.376v.003a6.689 6.689 0 0 1-1.49 5.655l-7.954 9.48a2.518 2.518 0 0 1-3.857 0L2.12 12.37A6.683 6.683 0 0 1 .627 6.714 6.757 6.757 0 0 1 5.21 1.57zm3.12 1.803a4.757 4.757 0 0 0-5.74 3.725l-.001.002a4.684 4.684 0 0 0 1.049 3.969l.009.01 7.958 9.485a.518.518 0 0 0 .79 0l7.968-9.495a4.688 4.688 0 0 0 1.049-3.965 4.803 4.803 0 0 0-3.931-3.794 4.74 4.74 0 0 0-4.023 1.256l-.008.008a2.123 2.123 0 0 1-2.9 0l-.007-.007a4.757 4.757 0 0 0-2.214-1.194z"></path></svg></div>
                      </React.Fragment> :  <div className="p-3"><svg role="img" height="32" width="32" aria-hidden="true" viewBox="0 0 24 24" className=" cursor-pointer" data-encore-id="icon" ><path className="fill-[var(--dark-text)]" d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path></svg></div> }
                    </div>
                    <div className="py-3 px-12 grid music-grid text-sm font-spotifyLight text-[var(--dark-text)]">
                          {favList.favId  &&  favList.favId.length > 0 ?   <DefaultHeading setDivWidth={setDivWidth} /> : null}
                    </div>
                    <div className="px-8">
                        <div className="h-[0.5px] bg-[var(--essential-subdued)]"></div>
                    </div>
                         <div className="py-3 px-8 flex flex-col gap-1">
                        {favTracks?.likeInfo?.length>0  ? favTracks.likeInfo.map((item,index)=>{
                            return  <TwoClickMusicChanger key={item._id}>
                            {(props) => (
                              <SongList
                                id="collections"
                                currentPlaylist={{
                                  _id: "collections",
                                  songDetails: favTracks.likeInfo,
                                }}
                                divWidth={divWidth}
                                index={index + 1}
                                item={item}
                                openDialogIndex={props.openDialogIndex}
                                handleOpenDialog={props.handleOpenDialog}
                                ref={props.buttonRef}
                              />
                            )}
                          </TwoClickMusicChanger>
                          
                          }) : <div className="text-white w-full justify-center flex pt-12 text-lg">No Songs Found</div> }
                         </div>
                </div>
            </div>
    </div> )
}
export default memo(LikedPlaylist);