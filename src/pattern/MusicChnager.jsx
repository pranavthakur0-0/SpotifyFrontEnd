import React, { memo, useContext, useCallback } from 'react';
import { fetchAndDecodeAudio } from '../MusicPlayer/MusicPlayer';
import useMusicPlayerRefs from '../components/Refs/MusicRefs';
import { usePlaylist, useSong } from '../context/contextProvider';
import { TimeContext } from '../pages/Home';
import { pauseAudio, Playaudio } from '../MusicPlayer/MusicPlayer';
import { Stringify } from '../utils/StorageFun';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { SetcurrentSong, setCurrentPlaylist } from '../components/slice/QueueSlice';

function MusicChanger({ item, children, buttonRef, currentPlaylist }) {
  const {
    audioContextRef,
    sourceNodeRef,
    grainNodeRef,
    bufferRef
  } = useMusicPlayerRefs();
  const { Playlist } = usePlaylist();
  const currentSong =  useSelector(state=>state.Songs.currentSong);
  const dispatch = useDispatch();
  const { startedAt, setstartedAt, setduration, sound, setpaused, setCurrentTime } = useContext(TimeContext);
  const { pauseAndPlay } = useSong();
  const [Cookie] = useCookies('userId');
  
  const handleClick = useCallback(() => {
    if(currentPlaylist){
      dispatch(setCurrentPlaylist(Playlist.listInfo));
    }
    if (item?._id !== currentSong?._id) {
        setCurrentTime(0);
        setstartedAt(0); 
        fetchAndDecodeAudio(audioContextRef, sourceNodeRef, grainNodeRef, bufferRef, item, setduration, sound, Cookie);
        dispatch(SetcurrentSong(item));
        pauseAndPlay.setIsPlaying(true);
        setpaused(false);
        Stringify('paused', false);
    } else {
      if (pauseAndPlay.isPlaying) {
        pauseAudio( audioContextRef, sourceNodeRef, setstartedAt, startedAt);
        pauseAndPlay.setIsPlaying(false);
        setpaused(true);
        Stringify('paused', true);
      } else {
        Playaudio( audioContextRef, sourceNodeRef, grainNodeRef, bufferRef, sound, setstartedAt, startedAt);
        pauseAndPlay.setIsPlaying(true);
        setpaused(false);
        Stringify('paused', false);
      }
    }
  }, [ item, Playlist.listInfo, currentPlaylist, currentSong, dispatch, audioContextRef, sourceNodeRef, grainNodeRef, bufferRef, setduration, sound, Cookie, setstartedAt, startedAt, setCurrentTime, setpaused, pauseAndPlay
  ]);

  return (
    <div onClick={handleClick} ref={buttonRef}>
      {children}
    </div>
  );
}

export default memo(MusicChanger);
