import React from "react";
import { useCookies } from "react-cookie";
import { authenticatedPatchRequest } from "../utils/ServerHelpers";
import { useMenu, usePlaylist } from "../context/contextProvider";

function RemoveSongFromPlaylist({ songItem, currentPlaylist,...props }) {
  const [Cookie] = useCookies(['userId']);
  const { Playlist } = usePlaylist();
  const { toastMessage, toastColor, toastBool } = useMenu();

  const handleRemoveSong = async (e) => {
    const route = `/playlist/${currentPlaylist._id}/${songItem._id}`;
    const response = await authenticatedPatchRequest(route, Cookie);
    if(response){
         Playlist.setlistInfo(response.playlist);
         toastMessage.setMessage(response.message);
         toastColor.setColor('--essential-announcement');
         toastBool.setPopUp();
    }
  };
  return (
    <div onClick={handleRemoveSong}>
            {props.children}
    </div>
  );
}

export default RemoveSongFromPlaylist;
