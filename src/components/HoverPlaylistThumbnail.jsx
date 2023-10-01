import { memo, useEffect, useRef, useState } from "react"
import { useAuth, useMenu, usePlaylist } from "../context/contextProvider";
import { authenticatedPatchRequest } from "../utils/ServerHelpers";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
const HoverPlaylistThumbnail = ({thumbnail, width, owner, remove, wait}) => {
    const [hover, sethover] = useState();
    const {playlistMenu} = useMenu();
    const {authId} = useAuth();
    const [verified, setverified] = useState();
    const {imgPreview, changePlaylistImg} = usePlaylist();
    const [removePhotoToggle, setremovePhotoToggle] = useState(true);
    const [popUp, setpopUp] = useState(false);  
    const InputRef = useRef();
    const { id } = useParams();
    const [Cookie,] = useCookies(['userId']);

    
    useEffect(() => {
      if (authId === owner && authId !== null) {
        setverified(true);
      }
    }, [authId, owner]);
  
    const handleMouseEnter = () => {
      if (verified) {
        sethover(true);
      }
    };
  
    const handleMouseLeave = () => {
      if (verified) {
        sethover(false);
      }
    };
  
    const handleClick = () => {
      if (verified) {
        playlistMenu.setEditPlaylistMenu(true);
      }
    };
  
    const handleButtonClick = () => {
      // Click the hidden file input when the button is clicked
      setpopUp(false);
      sethover(false);
      InputRef.current[0].click();
    };

    const removingImagefrombackend = async()=>{
      const route = `/playlist/${id}`;
      await authenticatedPatchRequest(route, Cookie);
    }
  
    const handleRemovePhoto = () => {
      setremovePhotoToggle(false);
      imgPreview.setPreview(null);
      setpopUp(false);
      sethover(false);
      removingImagefrombackend();

    };
  
    //One Important guideline here
    // If you are uploading any image and want to upload new image one after other quickly remove the previous image otherwise it will work sometimes and sometime won't work
    const changeHandler = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        changePlaylistImg.setUpdatedPlaylistImg(file);
        if (imgPreview.preview) {
          window.URL.revokeObjectURL(imgPreview.preview);
        }
        imgPreview.setPreview(URL.createObjectURL(file));
        setremovePhotoToggle(true);
      }
      if(InputRef){
        InputRef.current.reset();
      }
    };


      const dynamicClassName = `${verified ? "cursor-pointer " : ""} overflow-hidden flex justify-center items-center bg-[var(--home-card-hover)]`;
      const dynamicStyle = width ? { width: `${width}px`, height: `${width}px` } : null;
      

    return (
               <div>
                <div className="relative h-fill w-fill bg-black/25">
                 <div onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave} 
                    onClick={handleClick}
                    className={width ? dynamicClassName + "shadow-[rgba(0,_0,_0,_0.1)_0px_0px_16px] lg:w-[232px] lg:h-[232px] w-[192px] h-[192px]" : dynamicClassName + " lg:w-[232px] lg:h-[232px] w-[192px] h-[192px]"}
                    style={dynamicStyle}>
                    {thumbnail && removePhotoToggle ? 
                        <img className="w-full h-full" style={{objectFit : "cover"}} src={imgPreview.preview && remove ? imgPreview.preview : thumbnail} alt={"playlist thumbnail"} /> :  <svg role="img" height="70" width="70" aria-hidden="true" data-testid="playlist" viewBox="0 0 24 24" data-encore-id="icon"><path className={hover ? `fill-[var(--home-card-hover)]` : `fill-[var(--dark-text)]` } d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path></svg>
                    }
                    {wait ? <div className=" absolute h-full w-full bg-black/50 flex justify-center items-center">
                    <div role="status">
                        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-400 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                    </div>
                    </div> : null}
                    {hover ?  
                    <div className="absolute h-full w-full flex flex-col justify-center items-center gap-1 bg-[var(--background-dark-tinted)]" style={width ? {width : `${width}px`, height : `${width}px`} : null}>
                    <svg role="img" height="50" width="50" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon"><path className="fill-white" d="M17.318 1.975a3.329 3.329 0 1 1 4.707 4.707L8.451 20.256c-.49.49-1.082.867-1.735 1.103L2.34 22.94a1 1 0 0 1-1.28-1.28l1.581-4.376a4.726 4.726 0 0 1 1.103-1.735L17.318 1.975zm3.293 1.414a1.329 1.329 0 0 0-1.88 0L5.159 16.963c-.283.283-.5.624-.636 1l-.857 2.372 2.371-.857a2.726 2.726 0 0 0 1.001-.636L20.611 5.268a1.329 1.329 0 0 0 0-1.879z"></path></svg>
                    <span className="text-white">Choose Photo</span>
                    {remove ? <div onMouseLeave={e=>setpopUp(false)} onMouseEnter={e=>setpopUp(true)} className="bg-black/50 rounded-full absolute top-2 cursor-pointer right-2 z-50">
                      <svg role="img" height="32" width="32" aria-hidden="true" viewBox="0 0 24 24" className=" cursor-pointer" data-encore-id="icon"><path className="fill-[var(--dark-text)]" d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path></svg>
                     {popUp ?  <div className="absolute p-1 bg-[--playlist-container] w-[10rem] text-sm  font-spotifyLight  rounded-sm flex gap-2 flex-col">
                          <button className=" flex justify-start whitespace-nowrap py-3 px-4 rounded-sm tracking-wider cursor-pointer hover:bg-white/20" onClick={handleButtonClick}>Change Photo</button>
                          <button className=" flex justify-start whitespace-nowrap py-3 px-4 rounded-sm tracking-wider cursor-pointer hover:bg-white/20" onClick={handleRemovePhoto}>Remove Photo</button>
                      </div> : null}
                    </div> : null}
                  </div> : null}
                    {verified ? 
                   <label className="cursor-pointer w-full h-full z-20 absolute">
                  <form ref={InputRef}>
                    <input type='file' className="w-0" onChange={changeHandler} accept="image/*"/>
                  </form>
                 </label> : null}
                </div>
               </div>
               </div>
            )
};




export default memo(HoverPlaylistThumbnail);