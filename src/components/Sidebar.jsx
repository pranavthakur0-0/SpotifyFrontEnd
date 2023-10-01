import React, { memo, useMemo } from "react";
import { useEffect, useRef} from "react";
import SideBarHomeSearch from "../components/SideBarHomeSearch.jsx"
import EmptyPlaylist from "./EmptyPlaylist.jsx"
import { useResizable } from "../utils/SideBarUtliltyMovement.js";
import SideBarLibrary from "./SideBarLibray.jsx"
import { useCookies } from "react-cookie";
import { authenticatedGetRequest } from "../utils/ServerHelpers.js";
import PlaylistSidebar from "./PlaylistSidebar.jsx"
import { useSideBar } from "../context/sidebarProvider.js";
import { usePlaylist } from "../context/contextProvider.js";


function Sidebar() {
  const screenWidth = useMemo(() => window.innerWidth , []);
  const initialWidth = useMemo(() => (screenWidth / 3.5) ,[screenWidth]);
  const ref = useRef(null);
  const refRight = useRef(null);
  const isDragging = useResizable(ref, refRight, initialWidth);
  const [Cookie] = useCookies(['userId']);
  const {Playlist} = usePlaylist();
  const { SideBarList } = useSideBar();

  useEffect(() => {
    async function fetchData() {
      const route = "/getUserplaylist";
      const response = await authenticatedGetRequest(route, Cookie);
      if (response) {
         SideBarList.setlistInfo(response.playlistWithUsername);
      }
    }
    fetchData();

    // eslint-disable-next-line
  }, [Cookie, Playlist.setlistInfo]);



  return (
    <>
        <div ref={ref} className="w-[440px] h-full bg-black flex flex-col gap-2 rounded-md pb-2">
          <div className="rounded-md text-white h-full flex flex-col">
           <SideBarHomeSearch />
           <SideBarLibrary /> 
              {Cookie.userId ? <PlaylistSidebar /> : <EmptyPlaylist />}  
            </div>
          </div>
        <div ref={refRight} className={`z-10 h-full w-[3px] border-l-[1px] border-l-black cursor-col-resize   hover:border-l-zinc-600 ${isDragging ? "border-l-zinc-600" : "" }`}></div>
    </>
  );
}


export default memo(Sidebar);