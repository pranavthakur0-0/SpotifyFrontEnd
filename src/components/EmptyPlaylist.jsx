import { memo, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import LoginSideBarPopUp from "./LoginSideBarPopUp";
import { handleCreatePlaylist } from "../utils/SideBarUtliltyMovement";
import { useMenu } from "../context/contextProvider";
import { useSideBar } from "../context/sidebarProvider";

function EmptyPlaylist() {
  const { toastMessage, toastColor, toastBool } = useMenu();
  const ref = useRef();
  const [Cookie] = useCookies(["userId"]);

  const { SideBarList, Login } = useSideBar();

  const createPlaylist = async(e) => {
    const response = await handleCreatePlaylist(Cookie, Login);
    if(response){
      SideBarList.setlistInfo(response.playlistWithUsername);
      toastMessage.setMessage(response.msg);
      toastColor.setColor('--essential-announcement');
      toastBool.setPopUp();
    }
  };



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        Login.setneedLogin(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div
        ref={ref}
        className="bg-[var(--background-base)] px-2 h-full rounded-b-md flex flex-col gap-6 py-2 leading-[1.6rem]"
      >
        <div className="w-full h-fit bg-[var(--background-elevated-base)] text-white flex flex-col rounded-md">
          <div className="py-4 p-5 text-white flex gap-4 flex-col relative">
            <div className="flex flex-col gap-2 ">
              <span>Create your first playlist</span>
              <span className="text-[0.8rem] font-spotifyLight tracking-[0.03rem]">
                It’s easy, we’ll help you
              </span>
              {Login.needLogin ? <LoginSideBarPopUp /> : null}
            </div>
            <div>
              <button
                onClick={createPlaylist}
                className="py-[0.4rem] px-4 bg-white rounded-full text-black text-sm hover:scale-105 transition-transform ease-in-out"
              >
                Create playlist
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-fit bg-[var(--background-elevated-base)] text-white flex flex-col rounded-md">
          <div className="py-4 p-5 text-white flex gap-4 flex-col">
            <div className="flex flex-col gap-2 ">
              <span>Let’s find some podcasts to follow</span>
              <span className="text-[0.8rem] font-spotifyLight tracking-[0.03rem]">
                We’ll keep you updated on new episodes
              </span>
            </div>
            <div>
              <button
                onClick={(e) => Login.setneedLogin(true)}
                className="py-[0.4rem] px-4 bg-white rounded-full text-black text-sm hover:scale-105 transition-transform ease-in-out"
              >
                Browse podcasts
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default memo(EmptyPlaylist);