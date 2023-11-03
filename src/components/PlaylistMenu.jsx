import { useLayoutEffect, useRef } from "react";
import { useMenu, usePlaylist } from "../context/contextProvider";
import { authenticatedDeleteRequest, authenticatedPostRequest } from "../utils/ServerHelpers";
import { useCookies } from "react-cookie";
import { useSideBar } from "../context/sidebarProvider";
import { useNavigate } from "react-router-dom";

function ListItem({setmenu, executableFunction, ...props}) {
  
    // const handleMouseEnter = useCallback(() => {
    //   if (setspecificDialoge && id) {
    //     setspecificDialoge(id);
    //   }
    // }, [setspecificDialoge, id]);
  
    // const handleMouseLeave = useCallback(() => {
    //   if (setspecificDialoge && id) {
    //     setspecificDialoge(null);
    //   }
    // }, [setspecificDialoge, id]);
  
    const handleClick = (e)=>{
        executableFunction();
        setmenu(false);
        e.stopPropagation()

    }
    return (
      <li onClick={handleClick} className={` flex items-center gap-3 relative px-3 py-3 hover:bg-[--background-tinted-base] rounded-sm`}
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
        >
        {props.children}
      </li>
    );
  }

const PlaylistMenu = ({setHeight, setmenu})=>{
    const [Cookie,] = useCookies(['userId']);
    const heightRef = useRef();
    const {playlistMenu} = useMenu();
    const { Playlist } = usePlaylist();
    const { SideBarList } = useSideBar();
    const navigate = useNavigate();
    const {toastColor, toastBool, toastMessage} = useMenu();

    useLayoutEffect(() => {
        if (heightRef.current && setmenu) {
          setHeight(heightRef.current.getBoundingClientRect().height);
        }
      }, [setHeight, setmenu]);

    
        // const removeProfile = async()=>{
        //  const route = `/playlist/${Playlist?.listInfo?._id}`;
        //  const response = await authenticatedDeleteRequest(route, Cookie);
        // }

    const createSimilarPlaylist = async(e)=>{
        const route = `/playlist/${Playlist?.listInfo?._id}`;
        const response = await authenticatedPostRequest(route, Cookie);
        SideBarList.setlistInfo(response?.userPlaylists);
        toastMessage.setMessage(response?.msg);
        toastColor.setColor('--essential-announcement');
        toastBool.setPopUp();
    }

    const deleteUserPlaylist = async(e)=>{
        const route = `/playlist/${Playlist?.listInfo?._id}`;
        const response = await authenticatedDeleteRequest(route, Cookie);
        SideBarList.setlistInfo(response?.userPlaylists);
        toastMessage.setMessage(response?.msg);
        toastColor.setColor('--essential-announcement');
        toastBool.setPopUp();
        navigate('/');
    }

    const shareLink = async(e)=> {
             navigator.clipboard.writeText(window.location.href)
             .then(() => {
                toastMessage.setMessage("Link copied to clipboard");
                toastColor.setColor('--essential-announcement');
                toastBool.setPopUp();
             })
             .catch(err => {
               console.error('Failed to copy text: ', err);
             });
        };


    const editFunction  = (e)=>{
        setmenu(false);
        playlistMenu.setEditPlaylistMenu(true)
    }

    return (
    <div ref={heightRef} className="z-[1000] min-w-[15rem] text-left p-[0.3rem] text-sm font-spotifyBook tracking-wider  absolute h-fit w-fit  text-white bg-[--home-card-hover] rounded-sm p-[0.25rem">
                <ul className="flex flex-col">
                  {/* <ListItem executableFunction={removeProfile} setmenu={setmenu}>
                        <span className="h-4 w-4" >    
                        <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className=" fill-gray-400" ><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM1.5 8a6.5 6.5 0 1 1 11.395 4.277 3.504 3.504 0 0 0-1.163-1.088l-1.523-.88a.285.285 0 0 1-.076-.428l.086-.104v-.001c.549-.654.962-1.449 1.02-2.422.03-.526-.055-1.074-.165-1.395a3.23 3.23 0 0 0-.671-1.154 3.259 3.259 0 0 0-4.806 0 3.23 3.23 0 0 0-.672 1.154c-.109.32-.195.87-.163 1.395.057.973.47 1.768 1.018 2.422l.087.105a.285.285 0 0 1-.076.428l-1.523.88a3.506 3.506 0 0 0-1.163 1.088A6.475 6.475 0 0 1 1.5 8zm2.74 5.302c.173-.334.44-.62.778-.814l1.523-.88A1.784 1.784 0 0 0 7.02 8.92l-.088-.105-.002-.002c-.399-.476-.637-.975-.671-1.548a2.71 2.71 0 0 1 .087-.824 1.74 1.74 0 0 1 .357-.623 1.76 1.76 0 0 1 2.594 0c.155.17.274.378.357.623a2.716 2.716 0 0 1 .087.824c-.034.573-.272 1.072-.671 1.548l-.002.002-.088.105c-.709.85-.48 2.135.479 2.688l1.523.88c.338.195.605.48.779.814A6.47 6.47 0 0 1 8 14.5a6.47 6.47 0 0 1-3.76-1.198z"></path></svg></span>
                        <span>Remove from profile</span>
                  </ListItem> */}
            <li onClick={editFunction} className={` flex items-center gap-3 relative px-3 py-3 hover:bg-[--background-tinted-base] rounded-sm`}>
                        <span className="h-4 w-4" >    
                        <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className=" fill-gray-400"><path d="M11.838.714a2.438 2.438 0 0 1 3.448 3.448l-9.841 9.841c-.358.358-.79.633-1.267.806l-3.173 1.146a.75.75 0 0 1-.96-.96l1.146-3.173c.173-.476.448-.909.806-1.267l9.84-9.84zm2.387 1.06a.938.938 0 0 0-1.327 0l-9.84 9.842a1.953 1.953 0 0 0-.456.716L2 14.002l1.669-.604a1.95 1.95 0 0 0 .716-.455l9.841-9.841a.938.938 0 0 0 0-1.327z"></path></svg>
                        </span>
                        <span>Edit details</span>
             </li>
                  <ListItem executableFunction={createSimilarPlaylist} setmenu={setmenu}>
                        <span className="h-4 w-4" >    
                        <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className=" fill-gray-400"><path d="M5.295 4.5a.75.75 0 0 1 .747.682c.06.65.334 1.68.954 2.572.606.87 1.527 1.596 2.927 1.75a.75.75 0 0 1 0 1.491c-1.4.154-2.321.88-2.927 1.751a5.683 5.683 0 0 0-.954 2.572.75.75 0 0 1-1.493 0 5.683 5.683 0 0 0-.954-2.572c-.606-.87-1.527-1.597-2.927-1.75a.75.75 0 0 1 0-1.492c1.4-.154 2.321-.88 2.927-1.75.62-.892.894-1.922.954-2.572a.75.75 0 0 1 .746-.682zm-2.2 5.75a5.664 5.664 0 0 1 1.732 1.64c.178.256.333.52.468.785.136-.265.291-.529.47-.785a5.664 5.664 0 0 1 1.73-1.64 5.663 5.663 0 0 1-1.73-1.64 6.724 6.724 0 0 1-.47-.785c-.135.265-.29.529-.468.785a5.663 5.663 0 0 1-1.732 1.64zm5.884-6.448c1.603-.508 2.434-1.776 2.798-2.83.04-.114.406-.114.446 0 .364 1.054 1.195 2.322 2.798 2.83.115.036.115.36 0 .396-1.603.508-2.434 1.775-2.798 2.83-.04.114-.406.114-.446 0-.364-1.055-1.195-2.322-2.798-2.83-.115-.036-.115-.36 0-.396z"></path></svg>
                        </span>
                        <span>Create similar playlist</span>
                  </ListItem>
                  <ListItem executableFunction={deleteUserPlaylist} setmenu={setmenu}>
                        <span className="h-4 w-4" >    
                            <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className=" fill-gray-400"><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path><path d="M12 8.75H4v-1.5h8v1.5z"></path></svg>
                        </span>
                        <span>Delete</span>
                  </ListItem>
                  <ListItem executableFunction={shareLink} setmenu={setmenu}>
                        <span className="h-4 w-4" >    
                            <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className=" fill-gray-400"><path d="M1 5.75A.75.75 0 0 1 1.75 5H4v1.5H2.5v8h11v-8H12V5h2.25a.75.75 0 0 1 .75.75v9.5a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75v-9.5z"></path><path d="M8 9.576a.75.75 0 0 0 .75-.75V2.903l1.454 1.454a.75.75 0 0 0 1.06-1.06L8 .03 4.735 3.296a.75.75 0 0 0 1.06 1.061L7.25 2.903v5.923c0 .414.336.75.75.75z"></path></svg>
                        </span>
                        <span>Share</span>
                  </ListItem>
                </ul>
            </div>)
}

export default PlaylistMenu;