import React, { memo, useContext, useEffect } from 'react';
import { fetchAndDecodeAudio } from '../MusicPlayer/MusicPlayer';
import useMusicPlayerRefs from '../components/Refs/MusicRefs';
import { useSong } from '../context/contextProvider';
import { TimeContext } from '../pages/Home';
import { pauseAudio, Playaudio } from '../MusicPlayer/MusicPlayer';
import { Stringify } from '../utils/StorageFun';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { SetcurrentSong, setCurrentPlaylistDetails, setCurrentPlaylistTONUll, setNextQueue, setPreviousQueue } from '../components/slice/QueueSlice';
import { useLocation, useParams } from 'react-router-dom';

function MusicChangerStable({ item, children, buttonRef, currentPlaylist }) {
  const {
    audioContextRef,
    audioElementRef,
    sourceNodeRef,
    grainNodeRef,
    bufferRef
  } = useMusicPlayerRefs();
  const {id} = useParams();
  const currentSong =  useSelector(state=>state.Songs.currentSong);
  const dispatch = useDispatch();
  const { startedAt, setstartedAt, setduration, sound, setpaused, setCurrentTime } = useContext(TimeContext);
  const { pauseAndPlay } = useSong();
  const [Cookie] = useCookies('userId');
  const currentPlaylistofredux = useSelector(state=>state.Songs.currentPlaylist);
  const location = useLocation();

  useEffect(()=>{
    console.log(currentPlaylistofredux);
  },[currentPlaylistofredux])


  const handleClick = ()=>{
  //   if(location.pathname.includes("collection")){
  //       if(item?._id === currentSong?._id && currentPlaylistofredux?._id !== "collections") {
  //           console.log(currentPlaylist);
  //           dispatch(setCurrentPlaylistDetails(currentPlaylist));
  //           setCurrentTime(0);
  //           setstartedAt(0); 
  //           fetchAndDecodeAudio(audioContextRef, sourceNodeRef, grainNodeRef, bufferRef, item, setduration, sound, Cookie);
  //           pauseAndPlay.setIsPlaying(true);
  //           setpaused(false);
  //           Stringify('paused', false);
  //    } else {
  //          if (pauseAndPlay.isPlaying) {
  //            pauseAudio( audioContextRef, sourceNodeRef, setstartedAt, startedAt);
  //            pauseAndPlay.setIsPlaying(false);
  //            setpaused(true);
  //            Stringify('paused', true);
  //          } else {
  //            Playaudio( audioContextRef, sourceNodeRef, grainNodeRef, bufferRef, sound, setstartedAt, startedAt);
  //            pauseAndPlay.setIsPlaying(true);
  //            setpaused(false);
  //            Stringify('paused', false);
  //          }
  //       }
  //   }
  //   else if(id && currentPlaylistofredux?._id !== id && item?._id === currentSong?._id){
        
  //       const currentIndex = currentPlaylist?.songDetails.indexOf(item);
  //       if (currentIndex !== -1) {
  //           const firstPart = currentPlaylist?.songDetails.slice(0, currentIndex);
  //           const secondPart = currentPlaylist?.songDetails.slice(currentIndex + 1);
  //           dispatch(setNextQueue(secondPart));
  //           dispatch(setPreviousQueue(firstPart))
  //          }
  //          dispatch(setdiverter(true));
  //          dispatch(setCurrentPlaylistDetails(currentPlaylist));
  //          setCurrentTime(0);
  //          setstartedAt(0); 
  //          fetchAndDecodeAudio(audioContextRef, sourceNodeRef, grainNodeRef, bufferRef, item, setduration, sound, Cookie);
  //          pauseAndPlay.setIsPlaying(true);
  //          setpaused(false);
  //          Stringify('paused', false);
  //          dispatch(setdiverter(false));
  //    }else if(id &&  currentPlaylist?._id === id && diverter){
  //          setCurrentTime(0);
  //          setstartedAt(0); 
  //          fetchAndDecodeAudio(audioContextRef, sourceNodeRef, grainNodeRef, bufferRef, item, setduration, sound, Cookie);
  //          dispatch(SetcurrentSong(item));
  //          pauseAndPlay.setIsPlaying(true);
  //          setpaused(false);
  //          Stringify('paused', false);
  //          dispatch(setdiverter(false));
  //      }
  //      else{
  //        if(item?._id !== currentSong?._id && currentPlaylistofredux?._id !== "collections") {
  //           setCurrentTime(0);
  //           setstartedAt(0); 
  //           fetchAndDecodeAudio(audioContextRef, sourceNodeRef, grainNodeRef, bufferRef, item, setduration, sound, Cookie);
  //           dispatch(SetcurrentSong(item));
  //           pauseAndPlay.setIsPlaying(true);
  //           setpaused(false);
  //           Stringify('paused', false);
  //           dispatch(setCurrentPlaylistDetails(currentPlaylist));
  //    } else {
  //          if (pauseAndPlay.isPlaying) {
  //            pauseAudio( audioContextRef, sourceNodeRef, setstartedAt, startedAt);
  //            pauseAndPlay.setIsPlaying(false);
  //            setpaused(true);
  //            Stringify('paused', true);
  //          } else {
  //            Playaudio( audioContextRef, sourceNodeRef, grainNodeRef, bufferRef, sound, setstartedAt, startedAt);
  //            pauseAndPlay.setIsPlaying(true);
  //            setpaused(false);
  //            Stringify('paused', false);
  //          }
  //       }
  //  }

      if(currentPlaylist?._id !== currentPlaylistofredux?._id)
      {
          setCurrentTime(0);
          setstartedAt(0); 
          fetchAndDecodeAudio(audioContextRef,audioElementRef, sourceNodeRef, grainNodeRef, bufferRef, item, setduration, sound, Cookie);
          dispatch(SetcurrentSong(item));
          pauseAndPlay.setIsPlaying(true);
          setpaused(false);
          Stringify('paused', false);
          dispatch(setCurrentPlaylistDetails(currentPlaylist));
      }else{
        if(item?._id !== currentSong?._id) {
          setCurrentTime(0);
          setstartedAt(0); 
          fetchAndDecodeAudio(audioContextRef,audioElementRef, sourceNodeRef, grainNodeRef, bufferRef, item, setduration, sound, Cookie);
          dispatch(SetcurrentSong(item));
          pauseAndPlay.setIsPlaying(true);
          setpaused(false);
          Stringify('paused', false);
          dispatch(setCurrentPlaylistDetails(currentPlaylist));
           } else {
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

     

  // this block here set the current music and nextQueue and previousQueue
    if(currentPlaylist?._id === id || currentPlaylist?._id === "collections" || currentPlaylist?._id === "search"){
        console.log("setting up");
        dispatch(setCurrentPlaylistDetails(currentPlaylist));
        dispatch(SetcurrentSong(item));
        const currentIndex = currentPlaylist?.songDetails.indexOf(item);
        if (currentIndex !== -1) {
            const firstPart = currentPlaylist?.songDetails.slice(0, currentIndex);
            const secondPart = currentPlaylist?.songDetails.slice(currentIndex + 1);
            dispatch(setNextQueue(secondPart));
            dispatch(setPreviousQueue(firstPart))
        }
    }else{ 
       dispatch(SetcurrentSong(item));
    }

    if(location.pathname.includes("search")){
         dispatch(setCurrentPlaylistTONUll());
    }
 
// eslint-disable-next-line
 };

  return (
    <div onClick={handleClick} ref={buttonRef}>
      {children}
    </div>
  );
}

export default memo(MusicChangerStable);
