import { memo, useEffect, useState } from "react";
import HoverPlaylistThumbnail from "../components/HoverPlaylistThumbnail.jsx";
import { useCookies } from "react-cookie";
import { authenticatedPostRequestWithFile } from "../utils/ServerHelpers.js";
import { useMenu, usePlaylist } from "../context/contextProvider.js";


function EditplaylistMenuPopUp() 
{
    const [wait, setwait] = useState(false) ;
    const { playlistMenu } = useMenu();
    const {Playlist, imgPreview, changePlaylistImg} = usePlaylist();
    const [Cookie,] = useCookies(['userId']);
    const [info, setinfo] = useState({
        id : "",
        name : "",
        description : "",
        thumbnail : "",
    })

    const remove = true;
    const savePlaylistDetails = async (e) => {
      setwait(true);
      const route = "/playlist";
     const response  = await authenticatedPostRequestWithFile(route, Cookie, info, changePlaylistImg);
      if(response){
       setwait(false);
       if(response.status === 200){
        Playlist.setlistInfo(response.data.playlist);
        playlistMenu.setEditPlaylistMenu(false);
     }
      }
       changePlaylistImg.setUpdatedPlaylistImg(null);
    };

   // Assuming editplaylist is defined somewhere in your code

    useEffect(() => {
         const {_id, name, description, thumbnail } = Playlist.listInfo; 
      
           setinfo({
             id : _id,
             name: name || "",
             description: description || "",
             thumbnail: thumbnail || "",
           });
    }, [Playlist.listInfo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setinfo((prevInfo) => ({
          ...prevInfo,
          [name]: value,
        }));
      };
      

      const handleClose = (e)=>{
        playlistMenu.setEditPlaylistMenu(false);
        imgPreview.setPreview(null);
        changePlaylistImg.setUpdatedPlaylistImg(null);
    }


  return (
    <div className="p-4 top-0 absolute h-screen w-screen bg-gradient-to-b from-stone-900/50 via-black-900/80 to-black/[0.925] z-50 left-0 flex justify-center items-center">
      <div className="max-w-[520px]  p-6 bg-[var(--playlist-container)] text-white rounded-lg flex-1 relative">
        <div className=" absolute h-full w-full backgroundOverlay top-0 left-0"></div>
        <div className="relative flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <span>Edit details</span>
            <button
              className="p-2 rounded-full hover:bg-[var(--background-tinted-base)]"
              onClick={handleClose}
            >
              <svg
                role="img"
                height="16"
                width="16"
                aria-hidden="true"
                aria-label="Close"
                viewBox="0 0 16 16"
                data-encore-id="icon"
                className="Svg-sc-ytk21e-0 haNxPq"
              >
                <path
                  fill="white"
                  d="M1.47 1.47a.75.75 0 0 1 1.06 0L8 6.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L9.06 8l5.47 5.47a.75.75 0 1 1-1.06 1.06L8 9.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L6.94 8 1.47 2.53a.75.75 0 0 1 0-1.06z"
                ></path>
              </svg>
            </button>
          </div>
          <div className="relative  flex gap-4">
            <HoverPlaylistThumbnail
              wait={wait}
              remove = {remove}
              thumbnail={imgPreview.preview ? imgPreview.preview : info.thumbnail}
              width={170}
              owner={Playlist.listInfo && Playlist.listInfo.owner ? Playlist.listInfo.owner : null} />
            <div className="flex-1 flex flex-col gap-4">
              <div className="bg-[var(--absent-background-input)] relative text-white h-fit rounded-[0.3rem] flex items-end justify-center">
                <input
                  placeholder="Add a name"
                  value={info.name}
                  onChange={handleChange}
                  type="text"
                  id="name"
                  name="name"
                  className={
                    //${error ? "shadow-[0px_0px_0px_1px_rgba(84,84,84,0.8)]" : null }
                `text-white text-sm font-spotifyLight bg-transparent peer w-full h-[40px] p-2 rounded-[0.3rem] outline-none autofill:text-white focus:shadow-[0px_0px_0px_1px_rgba(84,84,84,0.8)] placeholder:text-[0.75rem] placeholder:tracking-wider placeholder:text-[var(--dark-text-placeholder)]`}
                  autoComplete="off"
                />
                <label
                  className="absolute -top-2.5 left-4 opacity-0 text-[0.7rem] font-spotifyBook peer-focus:opacity-100 transition-opacity ease-in-out  tracking-wider"
                  htmlFor="name"
                >
                  <div className="relative">
                    <span className=" relative z-10">Name</span>
                    <div className=" absolute top-[0.55rem] h-[1px] w-full bg-[var(--absent-background-input)]"></div>{" "}
                  </div>
                </label>
              </div>
              <div className="bg-[var(--absent-background-input)] relative text-white h-full rounded-[0.3rem] flex items-end justify-center">
                <textarea
                  placeholder="Add a optional description"
                  value={info.description}
                  onChange={handleChange}
                  type="text"
                  id="description"
                  name="description"
                  className="text-white resize-none text-sm font-spotifyLight bg-transparent peer w-full h-full p-2 rounded-[0.3rem] outline-none autofill:text-white focus:shadow-[0px_0px_0px_1px_rgba(84,84,84,0.8)] placeholder:text-[0.75rem] placeholder:tracking-wider placeholder:text-[var(--dark-text-placeholder)]"
                  autoComplete="off"
                />
                <label
                  className="absolute -top-2.5 left-4 opacity-0 text-[0.7rem] font-spotifyBook peer-focus:opacity-100 transition-opacity ease-in-out  tracking-wider"
                  htmlFor="description"
                >
                  <div className="relative">
                    <span className=" relative z-10">Description</span>
                    <div className=" absolute top-[0.55rem] h-[1px] w-full bg-[var(--absent-background-input)]"></div>{" "}
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button onClick={savePlaylistDetails} className="px-7 py-3 bg-white text-black rounded-full hover:scale-105 transition-transform ease-in-out">
              Save
            </button>
          </div>
          <p className="text-[0.7rem] font-spotifyBook tracking-wider">
            By proceeding, you agree to give Spotify access to the image you
            choose to upload. Please make sure you have the right to upload the
            image.
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(EditplaylistMenuPopUp);