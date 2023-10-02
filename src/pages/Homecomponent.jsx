import { useLocation } from "react-router-dom";
import React, { memo, useRef, useState } from "react";
import DefaultHome from "../components/DefaultHome.jsx";
import Section from "./Section.jsx";
import Playlist from "../components/Playlist.jsx";
import { NavbarContext } from "../components/Context.jsx";
import UploadSong from "./UploadSong.jsx";
import LikedPlaylist from "./LikedPlaylist.jsx";
import CreateAlbum from "../components/CreateAlbum.jsx";
import SearchMain from "./Search/SeachMain.jsx";
import Footer from "../components/BasicComponent/Footer.jsx";
import Navbar from "../components/Navbar.jsx";

function Homecomponent() {
   const login = true;
   const location = useLocation();
   const componentRef = useRef(null);
   const [scrollNav, setscrollNav] = useState(0);
   const [Navcolor, setNavcolor] = useState('');
   const [SongSearch, setSongSearch] = useState(null);
   const [mainRes, setmainRes] = useState(null);
   const renderComponent = React.useMemo(() => {

     if (location.pathname === "/" ) {
       return <DefaultHome />;
      } else if (location.pathname.includes("/collection")) {
        return <LikedPlaylist />;
      } else if (location.pathname === "/artist" || location.pathname.includes("/playlist") || location.pathname === "/track") {
        return <Playlist />;
        
      }else if (location.pathname.includes("/search")) {
        return <SearchMain SongSearch={SongSearch} mainRes={mainRes} />;
       }
       else if (location.pathname.includes("/section")) {
       return <Section />;
      }
       else if (location.pathname.includes("/uploadAlbum")) {
        return <CreateAlbum />;
      } else if (location.pathname.includes("/uploadSong")) {
        return <UploadSong />;
     }
     return null;
     // eslint-disable-next-line 
   }, [location, login, SongSearch, mainRes]);


  // eslint-disable-next-line




  return (
     <NavbarContext.Provider value={{ scrollNav, setscrollNav, Navcolor, setNavcolor }}>
       <div ref={componentRef} className="ml-[5px] h-full w-full bg-black pb-2 rounded-md">
         <div className="h-full w-full rounded-md bg-[var(--background-base)]">
           <div className="w-full h-full rounded-t-md">
             <div className="z-10 h-full w-full rounded-t-md  flex flex-col my_scroll_div relative" id="scrollDivRef">
                  {location.pathname.includes("/search") && login ? <Navbar search={true} setmainRes={setmainRes} setSongSearch={setSongSearch}></Navbar> : <Navbar></Navbar>}
                  {renderComponent}
                 <Footer></Footer>
             </div>
           </div>
         </div>
       </div>
     </NavbarContext.Provider>
  );
}

export default memo(Homecomponent);



//  import React, { memo, useRef, useState } from "react";
//  import { NavbarContext } from "../components/Context.jsx";

//  function Homecomponent({children}) {
//    const componentRef = useRef(null);
//    const [scrollNav, setscrollNav] = useState(0);
//    const [Navcolor, setNavcolor]  = useState('');
//    return (
//      <NavbarContext.Provider value={{scrollNav, setscrollNav, Navcolor, setNavcolor}}>
//        <div ref={componentRef} className="ml-[5px] h-full w-full bg-black pb-2 rounded-md">
//          <div className="h-full w-full rounded-md bg-[var(--background-base)]">
//            <div className="w-full h-full rounded-t-md">
//              <div className="z-10 h-full w-full rounded-t-md  flex flex-col ">
//                {children}
//              </div>
//            </div>
//          </div>
//        </div>
//      </NavbarContext.Provider>
//    );
//  }


//  export default memo(Homecomponent)