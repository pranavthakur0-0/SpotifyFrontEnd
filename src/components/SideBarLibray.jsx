import { memo, useEffect, useRef, useState } from "react";
import { handleCreatePlaylist } from "../utils/SideBarUtliltyMovement";
import { useCookies } from "react-cookie";
import { useMenu } from "../context/contextProvider";
import { useSideBar } from "../context/sidebarProvider";

function SideBarLibrary() {
  const {toastColor, toastBool, toastMessage} = useMenu();
  const [OpenMenu, setOpenMenu] = useState(false);
  const ref = useRef(null);
  const [Cookie,] = useCookies(['userId']);
  const { SideBarList } = useSideBar();


  const fetchApi = async()=>{
     const response = await handleCreatePlaylist(Cookie);
     SideBarList.setlistInfo(response?.userPlaylists);
     toastMessage.setMessage(response.msg);
     toastColor.setColor('--essential-announcement');
     toastBool.setPopUp();
  }

  const createPlaylist = (e) => {
    e.stopPropagation(); 
    setOpenMenu(false);
    fetchApi()
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  return (
    <div  ref={ref} className="mt-2 w-full h-fit flex flex-col gap-0 px-4 py-2 rounded-t-md bg-[var(--background-base)]">
      <div className="flex justify-between group items-center">
        <div
          title="This is my explanation here."
          className="cursor-pointer flex items-center fill-[#b3b3b3] h-[40px] gap-3 px-2 py-1 group-hover:fill-white"
        >
          <svg
            role="img"
            height="24"
            width="24"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-encore-id="icon"
          >
            <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
          </svg>
          <span className="text-[#b3b3b3] hover:text-white">Your Library</span>
        </div>
        <div className="relative">
          <div
            onClick={(e) => setOpenMenu((curr) => !curr)}
            className="flex p-2 w-8 h-8 rounded-full fill-[#b3b3b3] hover:fill-white items-center hover:bg-zinc-900 cursor-pointer"
          >
            <svg
              role="img"
              height="16"
              width="16"
              aria-hidden="true"
              viewBox="0 0 16 16"
              data-encore-id="icon"
            >
              <path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"></path>
            </svg>
          </div>
          {OpenMenu ? (
            <div className="absolute z-20 p-1 rounded-sm bg-[var(--playlist-container)] font-spotifyLight text-[0.85rem] shadow-[-3px_3px_12px_0px_#0e0e0e] tracking-wider w-fit whitespace-nowrap">
              <button onClick={createPlaylist} className="p-3 flex gap-2 hover:bg-white/10 rounded-sm cursor-pointer">
                <svg
                  role="img"
                  height="16"
                  width="16"
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  data-encore-id="icon"
                >
                  <path
                    fill="white"
                    d="M2 0v2H0v1.5h2v2h1.5v-2h2V2h-2V0H2zm11.5 2.5H8.244A5.482 5.482 0 0 0 7.966 1H15v11.75A2.75 2.75 0 1 1 12.25 10h1.25V2.5zm0 9h-1.25a1.25 1.25 0 1 0 1.25 1.25V11.5zM4 8.107a5.465 5.465 0 0 0 1.5-.593v5.236A2.75 2.75 0 1 1 2.75 10H4V8.107zM4 11.5H2.75A1.25 1.25 0 1 0 4 12.75V11.5z"
                  ></path>
                </svg>
                <span>Create a new playlist</span>
              </button>
              <button className="p-3 flex gap-2 hover:bg-white/10 rounded-sm cursor-pointer">
                <svg
                  role="img"
                  height="16"
                  width="16"
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  data-encore-id="icon"
                >
                  <path
                    fill="white"
                    d="M1.75 1A1.75 1.75 0 0 0 0 2.75v11.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0 0 16 14.25v-9.5A1.75 1.75 0 0 0 14.25 3H7.82l-.65-1.125A1.75 1.75 0 0 0 5.655 1H1.75zM1.5 2.75a.25.25 0 0 1 .25-.25h3.905a.25.25 0 0 1 .216.125L6.954 4.5h7.296a.25.25 0 0 1 .25.25v9.5a.25.25 0 0 1-.25.25H1.75a.25.25 0 0 1-.25-.25V2.75z"
                  ></path>
                </svg>
                <span>Create playlist folder</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default memo(SideBarLibrary);