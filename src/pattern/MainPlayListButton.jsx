import { useDispatch, useSelector } from "react-redux";
import useMusicPlayerRefs from "../components/Refs/MusicRefs";
import { useContext } from "react";
import { TimeContext } from "../pages/Home";
import { setCurrentPlaylist } from "../components/slice/QueueSlice";
import { Playaudio, fetchAndDecodeAudio, pauseAudio } from "../MusicPlayer/MusicPlayer";
import { useCookies } from "react-cookie";
import { Stringify } from "../utils/StorageFun";
import { useSong } from "../context/contextProvider";
export default function MainPlayListButton({currentPlaylist, ...props}){
    const {
        audioContextRef,
        audioElementRef,
        sourceNodeRef,
        grainNodeRef,
        bufferRef
      } = useMusicPlayerRefs();
      const {startedAt, setstartedAt, setduration, sound, setpaused, setCurrentTime } = useContext(TimeContext);
      const dispatch = useDispatch();
      const [Cookie,] = useCookies(['userId']);
      const { pauseAndPlay } = useSong();
      const currentPlaylistofRedux = useSelector(state=>state.Songs.currentPlaylist);
      
    const AddPlaylistToQueue = ()=>{
  
      if (currentPlaylist?.songDetails.length > 0 && currentPlaylistofRedux?._id !== currentPlaylist._id) {
        setCurrentTime(0);
        setstartedAt(0); 
        dispatch(setCurrentPlaylist(currentPlaylist));
        const firstSong = currentPlaylist?.songDetails[0];
        fetchAndDecodeAudio(audioContextRef,audioElementRef, sourceNodeRef, grainNodeRef, bufferRef, firstSong, setduration, sound, Cookie);
        pauseAndPlay.setIsPlaying(true);
        setpaused(false);
        Stringify('paused', false);
      }else{
            if (pauseAndPlay.isPlaying) {
              pauseAudio( audioContextRef,audioElementRef, sourceNodeRef, setstartedAt, startedAt);
              pauseAndPlay.setIsPlaying(false);
              setpaused(true);
              Stringify('paused', true);
            } else {
              Playaudio( audioContextRef,audioElementRef, sourceNodeRef, grainNodeRef, bufferRef, sound, setstartedAt, startedAt);
              pauseAndPlay.setIsPlaying(true);
              setpaused(false);
              Stringify('paused', false);
            }
      }
  }
    return (
        <button onClick={AddPlaylistToQueue}>
            {props.children}
        </button>
    )
}