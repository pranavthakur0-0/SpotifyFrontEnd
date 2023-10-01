import React from "react";
import { useCookies } from "react-cookie";
import { authenticatedPostRequest } from "../utils/ServerHelpers";
import { useMenu, useSong } from "../context/contextProvider";

function AddAndRemoveLikedSong({ item,...props }) {
  const [Cookie] = useCookies(['userId']);
  const { favList } = useSong();
  const { toastMessage, toastColor, toastBool } = useMenu();

  const handleAddToLikedSong = async (e) => {
    const route = "/likedSong";
    const response = await authenticatedPostRequest(route, Cookie, item);
    if(response.success){
         favList.setfavId(response.data); 
         toastMessage.setMessage(response.msg);
         toastColor.setColor('--essential-announcement');
         toastBool.setPopUp();
    }
  };

  return (
    <div onClick={handleAddToLikedSong}>
            {props.children}
    </div>
  );
}

export default AddAndRemoveLikedSong;
