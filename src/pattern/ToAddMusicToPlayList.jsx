import React from 'react';
import { authenticatedPostRequest } from '../utils/ServerHelpers';
import { useCookies } from 'react-cookie';

export default function ToAddMusicToPlaylist({songItem, playlistItem, ...props}) {
    const [Cookie] = useCookies(["userId"]);
    const route = "/addSongPlaylist";
  const handleClick = async() => {
    const body = {
        songId: songItem._id,
        playlistId: playlistItem._id,
      };
    try {
        const res = await authenticatedPostRequest(route, Cookie, body);
        if (res) {
          // Check if the response is not empty
          console.log(res);
        } else {
          // Handle empty response
          console.error('Empty response received.');
        }
      } catch (error) {
        // Handle other errors
        console.error('Error:', error);
      }
  };

  return (
    <div onClick={handleClick}>
      {props.children}
    </div>
  );
}
