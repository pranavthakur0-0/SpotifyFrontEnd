import { useDispatch, useSelector } from "react-redux";
import { SetcurrentSong, setNextQueue, setPreviousQueue } from "../components/slice/QueueSlice";
import { fetchAndDecodeAudio } from "../MusicPlayer/MusicPlayer";
import useMusicPlayerRefs from "../components/Refs/MusicRefs";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { TimeContext } from "../pages/Home";
import { Stringify } from "../utils/StorageFun";
import { useSong } from "../context/contextProvider";

export default function NextSongPattern({children}){
    const dispatch = useDispatch();
    const nextQueue = useSelector(state=>state.Songs.nextQueue);
    const currentSong = useSelector(state=>state.Songs.currentSong);
    const previousQueue = useSelector(state=>state.Songs.previousQueue);
    const { audioContextRef, sourceNodeRef, grainNodeRef, bufferRef} = useMusicPlayerRefs();
    const [Cookie,] = useCookies('userId');
    const { id } = useParams();
    const currentPlaylist = useSelector(state=>state.Songs.currentPlaylist);
    const { setstartedAt, setduration, sound, setCurrentTime, setpaused} = useContext(TimeContext);
    const { pauseAndPlay } = useSong();
    
    const handleClick = ()=>{
        if(nextQueue?.length > 0){
            const [nextCurrentSong, ...remainingSongs] = nextQueue;
            const previousQueueData = [...previousQueue, currentSong];
             dispatch(setPreviousQueue(previousQueueData));
             dispatch(SetcurrentSong(nextCurrentSong));
             dispatch(setNextQueue(remainingSongs));
             if(currentPlaylist?._id === id || currentPlaylist?._id === "collections"){
                setCurrentTime(0);
                setstartedAt(0); 
                fetchAndDecodeAudio(audioContextRef, sourceNodeRef, grainNodeRef, bufferRef, nextCurrentSong, setduration, sound, Cookie);
                pauseAndPlay.setIsPlaying(true);
                setpaused(false);
                Stringify('paused', false);
            }
        }
        if(nextQueue?.length === 1){
            console.log("Fetching the song");
        }
    }
    return ( <button onClick={handleClick}>
                 {children}
             </button>)
}