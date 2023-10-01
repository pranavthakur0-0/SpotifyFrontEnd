import React from "react";
import { Link } from "react-router-dom";
import { useSideBar } from "../context/sidebarProvider";
function LoginSideBarPopUp() {
  const { Login } = useSideBar();

  return (
    <div className="z-50 w-[18rem] h-fit rounded-lg p-4 flex -right-80 bg-[var(--login-required-sidebar)] absolute whitespace-nowrap">
      <div className="relative flex">
        <div className="relative h-full w-0 bg-black flex items-center">
          <div className="absolute -left-7 triangle-left"></div>
        </div>
        <div>
          <h5>Create a playlist</h5>
          <p className="font-spotifyLight text-sm tracking-wider">
            Log in to create and share playlists.
          </p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={(e) => Login.setneedLogin(false)}
              className="text-sm text-[var(--dark-text)] hover:scale-105 transition-transform ease-in-out hover:text-white"
            >
              Not now
            </button>
            <button className="text-sm bg-white text-black px-4 py-1 rounded-full hover:scale-105 transition-transform ease-in-out">
              <Link to="/login">Log In</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(LoginSideBarPopUp);
