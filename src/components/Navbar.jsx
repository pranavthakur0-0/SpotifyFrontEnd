import React, { memo, useContext, useEffect, useMemo, useRef, useState } from "react"
import { useCookies } from "react-cookie";
import { NavbarContext } from "./Context";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { authenticatedGetRequest } from "../utils/ServerHelpers";
import { useSelector, useDispatch } from 'react-redux'
import { setMainResult, setSongs} from "./slice/SearchSlice";


function Button({ children }) {
    return <button className="tracking-[0.1em] hover:scale-105 transition-transform ease-in-out hover:text-white">{children}</button>;
 }
 

function Navbar({search}){
    const disptach = useDispatch();

    useSelector(state => state.Search)
    const [cookie,] = useCookies(["userId"]);
    const navref = useRef(null);
    const {scrollNav, Navcolor, setscrollNav} = useContext(NavbarContext);
    const [searchInput, setseachInput] = useState('');

    const location = useLocation();
    const [Cookie] = useCookies(['userId']);
   
    useEffect(() => {
        setscrollNav(0);
        // eslint-disable-next-line
      }, [location.pathname]);

      function debounce(func, wait) {
        let timeout;
        return function(...args) {
          const context = this;
          if (timeout) clearTimeout(timeout);
          timeout = setTimeout(() => {
            timeout = null;
            func.apply(context, args);
          }, wait);
        };
      }
    

      const onChange = useMemo(() => async (term) => {
        try {
          if (term) {
            const route = `/search/${term}`;
            const response = await authenticatedGetRequest(route, Cookie);
            if (response) {
              response.bestResult ?   disptach(setMainResult(response.bestResult)) :   disptach(setMainResult(null)) 
              response.topSongs ? disptach(setSongs(response.topSongs)) : disptach(setSongs(null))
            }
          }else{
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
        // eslint-disable-next-line 
      }, [searchInput]);
    
      // eslint-disable-next-line
      const debounceOnChange = React.useCallback(debounce(onChange, 500), []);
      // eslint-disable-next-line

      const handleInput = (e) =>{
        const newSearchTerm = e.target.value;
        setseachInput(newSearchTerm);
        debounceOnChange(newSearchTerm);
        if(!e.target.value){
          disptach(setSongs(null));
        }
        debounceOnChange(newSearchTerm);
      }


    return (
        <div ref={navref} className={`top-0 h-16 z-50 w-full rounded-tr-md rounded-tl-md  py-4 px-6 transition-colors ease-in-out duration-[2000]`} style={cookie.userId ? (scrollNav > 250 ?{ backgroundColor :`${Navcolor}92`} : {backgroundColor : '#121212'} ) : {backgroundColor : '#121212'} }>
            <div className="w-full h-full flex items-center justify-between">
               <div className="flex">
                    <div className="gap-2 flex">
                        <span className="bg-black/50 p-2 rounded-full"><svg role="img" height="16" width="16" aria-hidden="true" className="fill-white/50" viewBox="0 0 16 16" data-encore-id="icon"><path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z"></path></svg></span>
                        <span className="bg-black/50 p-2 rounded-full">
                        <svg role="img" height="16" width="16" aria-hidden="true"  viewBox="0 0 16 16" data-encore-id="icon" className="fill-white/50"><path d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z"></path></svg>
                        </span>
                    </div>
                    {search ? 
                    <div className="relative flex items-center">
                      <div className="h-10 ml-6 w-full md:min-w-[20rem] overflow-hidden rounded-full md:max-w-[30rem] flex absolute gap-2 bg-[var(--background-tinted-base)] group outline-none hover:shadow-[0px_0px_0px_2px_rgba(150,150,150,1)] focus:shadow-[0px_0px_0px_1.5px_rgba(255,255,255,1)]">
                        <div className="flex pl-3 items-center" ><label htmlFor="search"><svg role="img" height="18" width="18" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon"><path className="fill-[#b3b3b3;] group-hover:fill-white" d="M7 1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zM.25 7a6.75 6.75 0 1 1 12.096 4.12l3.184 3.185a.75.75 0 1 1-1.06 1.06L11.304 12.2A6.75 6.75 0 0 1 .25 7z"></path></svg></label></div>
                        <input value={searchInput} onChange={handleInput} name="search" autoComplete="off" id="search" className="w-full pl-1 pr-2 bg-transparent outline-none text-white font-spotifyLight" type="text" />
                      </div>
                    </div> : null}
               </div>
           
                {cookie.userId ? 
                    <div className="flex gap-2 text-[var(--dark-text)] items-center">
                       <button className="px-6 py-[0.4rem] text-sm bg-white text-black rounded-full hover:scale-105 transition-transform ease-in-out">Explore Premium</button>
                       <button className="px-6 py-[0.4rem] flex items-center gap-2 text-sm bg-black/60 text-white rounded-full hover:scale-105 transition-transform ease-in-out"><svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon">
                                <path className="fill-white" d="M4.995 8.745a.75.75 0 0 1 1.06 0L7.25 9.939V4a.75.75 0 0 1 1.5 0v5.94l1.195-1.195a.75.75 0 1 1 1.06 1.06L8 12.811l-.528-.528a.945.945 0 0 1-.005-.005L4.995 9.805a.75.75 0 0 1 0-1.06z"></path>
                                <path className="fill-white"  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13z"></path>
                                </svg>
                                <span>Install App</span>
                        </button>
                        <button className="p-[0.4rem] bg-black/60 rounded-full">
                            <svg role="img" height="16" width="16" aria-hidden="true" data-testid="user-icon" viewBox="0 0 16 16" data-encore-id="icon"><path className="fill-white" d="M6.233.371a4.388 4.388 0 0 1 5.002 1.052c.421.459.713.992.904 1.554.143.421.263 1.173.22 1.894-.078 1.322-.638 2.408-1.399 3.316l-.127.152a.75.75 0 0 0 .201 1.13l2.209 1.275a4.75 4.75 0 0 1 2.375 4.114V16H.382v-1.143a4.75 4.75 0 0 1 2.375-4.113l2.209-1.275a.75.75 0 0 0 .201-1.13l-.126-.152c-.761-.908-1.322-1.994-1.4-3.316-.043-.721.077-1.473.22-1.894a4.346 4.346 0 0 1 .904-1.554c.411-.448.91-.807 1.468-1.052zM8 1.5a2.888 2.888 0 0 0-2.13.937 2.85 2.85 0 0 0-.588 1.022c-.077.226-.175.783-.143 1.323.054.921.44 1.712 1.051 2.442l.002.001.127.153a2.25 2.25 0 0 1-.603 3.39l-2.209 1.275A3.25 3.25 0 0 0 1.902 14.5h12.196a3.25 3.25 0 0 0-1.605-2.457l-2.209-1.275a2.25 2.25 0 0 1-.603-3.39l.127-.153.002-.001c.612-.73.997-1.52 1.052-2.442.032-.54-.067-1.097-.144-1.323a2.85 2.85 0 0 0-.588-1.022A2.888 2.888 0 0 0 8 1.5z"></path></svg>
                        </button>
                    </div>
                    : 
                     <div className="flex gap-8 text-[var(--dark-text)] items-center">
                        <div className="flex gap-3 tracking-widest">
                        <Button>Premium</Button>
                        <Button>Support</Button>
                        <Button>Download</Button>
                    </div>
                    <div className="h-6 w-[2px] bg-[var(--dark-text)]"></div>
                    <button className="hover:text-white hover:scale-105 transition-transform ease-in-out"><Link to='/register'>Sign up</Link></button>
                    <Link to='/login'> <button className="px-8 py-3 bg-white text-black rounded-full hover:scale-105 transition-transform ease-in-out"> Log In </button></Link>
                    </div>}
            </div>
        </div>
    )
}

export default memo(Navbar);