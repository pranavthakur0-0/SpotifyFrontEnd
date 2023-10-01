import { useEffect, useState } from "react"
import { authenticatedGetRequest, authenticatedPostRequest } from "../utils/ServerHelpers";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useMenu, useSong } from "../context/contextProvider";
import { listThumbnail } from "../utils/ImageResizer";
import { useSelector } from "react-redux";


export default function SongDetailsBottomBar(){
    const currentSong =  useSelector(state=>state.Songs.currentSong);
    const {  favList } = useSong();
    const { toastMessage, toastColor, toastBool } = useMenu();
    const [Cookie,] = useCookies(['userId']);
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
        const response = await authenticatedPostRequest(route, Cookie, currentSong);
        if(response.success){
            //list id
            favList.setfavId(response.data); 
             toastMessage.setMessage(response.msg);
             toastColor.setColor('--essential-announcement');
             toastBool.setPopUp();
        }
    }

    return (<>
            <div className=" cursor-pointer flex gap-2 items-center">
                <div className=" relative w-fit group">
                    <div className=" absolute top-1 right-1 rounded-full p-1 bg-black/60 hidden group-hover:block hover:scale-110 transition-transform ease-in-out">
                        <div className=" relative flex justify-center items-center group/icon fade-in-text ">
                            <div className="hidden absolute -top-8 p-[0.35rem] px-3 rounded-[0.2rem] font-spotifyBook tracking-wider text-[0.8rem] bg-[--home-card-hover] text-white group-hover/icon:flex faded-in">Expand</div>
                            <svg role="img" height="12" width="12" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon"><path fill="white" d="M.47 11.03a.75.75 0 0 0 1.06 0L8 4.56l6.47 6.47a.75.75 0 1 0 1.06-1.06L8 2.44.47 9.97a.75.75 0 0 0 0 1.06z"></path></svg>
                        </div>
                    </div>
                    <div className="w-14 h-14">
                    {currentSong && artist ? <img src={listThumbnail(currentSong.thumbnail)} className="w-14 h-14 rounded-md" alt="" /> : 
                        <svg role="img" height="24" width="24" aria-hidden="true" data-testid="playlist" viewBox="0 0 24 24" data-encore-id="icon"><path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path></svg>
                    }</div>
                </div>
                {currentSong && artist ? 
                <div className="flex-1 text-white text-[0.8rem] font-spotifyBook tracking-wider flex gap-1 flex-col">
                    <button className="text-base text-ellipsis whitespace-nowrap hover:underline"><Link to={`/song/${currentSong._id}`}>{currentSong.name}</Link></button>
                    <button className="text-[--dark-text] text-[0.7rem] font-spotifyLight hover:underline text-left"><Link to={`/profile/${artist._id}`}>{artist.username}</Link></button>
                </div> : null}
                <div className="ml-2">
                   {currentSong && artist ? <button onClick={AddtoLikedSong}>
                       {favList.favId && favList.favId.includes(currentSong._id) ? <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon"><path className="fill-primary" d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"></path></svg> :  <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon"><path className="fill-[--dark-text]" d="M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782 3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.463L1.348 8.309A4.582 4.582 0 0 1 1.689 2zm3.158.252A3.082 3.082 0 0 0 2.49 7.337l.005.005L7.8 13.664a.264.264 0 0 0 .311.069.262.262 0 0 0 .09-.069l5.312-6.33a3.043 3.043 0 0 0 .68-2.573 3.118 3.118 0 0 0-2.551-2.463 3.079 3.079 0 0 0-2.612.816l-.007.007a1.501 1.501 0 0 1-2.045 0l-.009-.008a3.082 3.082 0 0 0-2.121-.861z"></path></svg> }
                 </button> : null}
                </div>
            </div>
    </>)
}