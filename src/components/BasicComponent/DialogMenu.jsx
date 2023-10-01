import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSideBar } from "../../context/sidebarProvider";
import ToAddMusicToPlaylist from "../../pattern/ToAddMusicToPlayList";
import {useSong} from "../../context/contextProvider"
import AddAndRemoveLikedSong from "../../pattern/AddAndRemoveLikedSong";
import RemoveSongFromPlaylist from "../../pattern/RemoveSongFromPlaylist";

function toggleScrolling(disable) {
  const body = document.body;
  const containers = document.querySelectorAll('.my_scroll_div');

  if (disable) {
    body.classList.add('disable-scroll');
    containers.forEach(container => {
      container.classList.add('disable-scroll');
    });
  } else {
    body.classList.remove('disable-scroll');
    containers.forEach(container => {
      container.classList.remove('disable-scroll');
    });
  }
}

function ListItem({id , setspecificDialoge, ...props}) {

  const handleMouseEnter = useCallback(() => {
    if (setspecificDialoge && id) {
      setspecificDialoge(id);
    }
  }, [setspecificDialoge, id]);

  const handleMouseLeave = useCallback(() => {
    if (setspecificDialoge && id) {
      setspecificDialoge(null);
    }
  }, [setspecificDialoge, id]);

  return (
    <li
      className={`relative px-4 py-3 hover:bg-[--background-tinted-base] rounded-sm ${props.className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {props.children}
    </li>
  );
}
function DialogMenu({ positionX, song, AddtoPlaylist, ClassPlaylist, currentPlaylist, songItem, level = 1 }) {
  const box = useRef(null);
  const [position, setPosition] = useState("top");
  const [leftPosition, setLeftPosition] = useState(null);
  const [specificDialoge, setSpecificDialoge] = useState(null);
  const { SideBarList } = useSideBar();
  const { favList } = useSong();
  useEffect(() => {
    const boxRect = box.current.getBoundingClientRect();
    const screenHeight = window.innerHeight;
    const distanceFromBottom = Math.abs(screenHeight - (boxRect.top));
    if (boxRect.height + 80 > distanceFromBottom) {
      setPosition("bottom");
    } else {
      setPosition("top");
    }

    toggleScrolling(true);

    return () => {
      toggleScrolling(false);
    };
  }, []);

  useEffect(() => {
    if (positionX === "left") {
      setLeftPosition(`-${box?.current?.getBoundingClientRect().width}px`);
    } else {
      setLeftPosition(null);
    }
  }, [positionX]);


  return (
    <div 
      ref={box}
      className={`z-50 absolute h-fit w-fit  text-white bg-[--home-card-hover] rounded-sm p-[0.25rem] 
      ${level === 1 ? position  === "bottom"  ? "top-auto bottom-5" : "top-5" : "-top-[0.25rem]"}
      ${level !== 1 && position  === "bottom"  ? "top-auto -bottom-[0.25rem]"  : "-top-[0.25rem]"}
      ${positionX === "left" ? "" : "right-0"}`}
      style={{ left: leftPosition }}>
      <ul className="whitespace-nowrap text-left font-spotifyBook tracking-wide">
        {song ? (
          <>
            <ListItem id={1} setspecificDialoge={setSpecificDialoge} className="flex justify-between fill-white">
              Add to Playlist  {specificDialoge === 1 ? ( <DialogMenu songItem={songItem} positionX="left" AddtoPlaylist={true} level={level + 1}/>) : null}
              <svg role="img" height="16" width="16" aria-hidden="true" className="rotate-90" viewBox="0 0 16 16" data-encore-id="icon"
              >
                <path d="M14 10 8 4l-6 6h12z"></path>
              </svg>
            </ListItem>
            {favList?.favId.includes(songItem._id) ? <ListItem><AddAndRemoveLikedSong item={songItem}>Remove from your Liked Songs</AddAndRemoveLikedSong></ListItem> : <AddAndRemoveLikedSong item={songItem}><ListItem>Save to your Liked Song</ListItem></AddAndRemoveLikedSong>}

            {currentPlaylist && songItem ?  <ListItem><RemoveSongFromPlaylist songItem={songItem} currentPlaylist={currentPlaylist}>Remove from this playlist</RemoveSongFromPlaylist></ListItem> : null}

            <ListItem id={2} setspecificDialoge={setSpecificDialoge} className="flex justify-between fill-white">
              Add to Playlist
              {specificDialoge === 2 ? (
                <DialogMenu songItem={songItem} positionX="left" ClassPlaylist={true} level={level + 1}
                />
              ) : null}
              <svg role="img" height="16" width="16" aria-hidden="true" className="rotate-90" viewBox="0 0 16 16" data-encore-id="icon"
              >
                <path d="M14 10 8 4l-6 6h12z"></path>
              </svg>
            </ListItem>
          </>
        ) : null}

        {AddtoPlaylist  ? SideBarList.listInfo?.map((item) => (
              <ToAddMusicToPlaylist songItem={songItem} playlistItem={item} key={item._id}>
                <ListItem className="w-[13rem]">{item.name}</ListItem>
              </ToAddMusicToPlaylist>
            ))
          : null}

        {ClassPlaylist ? (
          <>
            <ListItem className="w-[13rem]">ClassPlaylist</ListItem>
          </>
        ) : null}
      </ul>
    </div>
  );
}

export default React.memo(DialogMenu);