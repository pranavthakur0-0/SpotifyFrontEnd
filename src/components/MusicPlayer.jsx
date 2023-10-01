import React, { useRef, useEffect, useState, memo, useContext, } from "react";
import { authenticatedGetRequest } from "../utils/ServerHelpers";
import { useCookies } from "react-cookie";
import { useSong } from "../context/contextProvider";
import {  starterfetchAndDecodeAudio } from "../MusicPlayer/MusicPlayer";
import { PlayaudioPercent, stopAndResetAudioContext } from "../MusicPlayer/MusicPlayer";
import AdditonalMusicPlayerButton from "./AdditonalMusicPlayerButton.jsx"
import SongDetailsBottomBar from "./SongDetailsBottomBar.jsx"
import { Stringify, parserGet } from "../utils/StorageFun.js";
import useMusicPlayerRefs from "./Refs/MusicRefs"
import { formatTime } from "../MusicPlayer/MusicPlayer";
import { TimeContext } from "../pages/Home";
import MusicChnager from "../pattern/MusicChnager";
import { useDispatch, useSelector } from "react-redux";
import { SetcurrentSong,} from "../components/slice/QueueSlice";
import NextSongPattern from "../pattern/NextSongPattern";
import PreviousSongPattern from "../pattern/PreviousSongPattern";
import { PlaynextFunction } from "../utils/MusicPlayerFunction";


function MusicPlayer() {
    const previousQueue = useSelector(state=>state.Songs.previousQueue);
    const currentSong =  useSelector(state=>state.Songs.currentSong);
    const dispatch = useDispatch();
    const { audioContextRef, sourceNodeRef, grainNodeRef, bufferRef} = useMusicPlayerRefs();
    const [loop, setloop] = useState(parserGet('LoopCondition') || false);
    const [Cookie,] = useCookies('userId');
    const { favList, songShuffle, songQueue, pauseAndPlay } = useSong();
    const {startedAt, setstartedAt, duration, setduration, sound, paused, setsound} = useContext(TimeContext);
    const progressBarRef = useRef(null);
    const {currentTime, setCurrentTime} =  useContext(TimeContext);
    const [progressBar, setprogressBar] = useState(null);
    const nextQueue = useSelector(state=>state.Songs.nextQueue);
    const fetchUserPref = async()=>{
      const route = "/userPref";
      const response = await authenticatedGetRequest(route, Cookie);
      if(response.data !==null){
        favList.setfavId(response.data.likedSong);
        songQueue.setQueue(response.data.queue);
        songShuffle.setShuffle(response.data.shuffle);
      }
    }


    useEffect(()=>{
      setprogressBar(currentTime);
    },[currentTime])



    const fetchSong = async()=>{
      const route = "/currentSong"
      const response = await authenticatedGetRequest(route,Cookie);
     if(response.response){
        dispatch(SetcurrentSong(response.response));
     }
  }

  const [effectHasRun, setEffectHasRun] = useState(true);

  useEffect(() => {
    if(currentSong && effectHasRun){
      setEffectHasRun(false);
      starterfetchAndDecodeAudio(audioContextRef,sourceNodeRef, grainNodeRef, bufferRef, currentSong, setduration, sound);
    } 
    // eslint-disable-next-line
  }, [currentSong]);


    useEffect(()=>{
         fetchSong();
         fetchUserPref();
        // eslint-disable-next-line 
    },[])



    const progressBarfunction = (e)=>{
      const position = e.clientX- progressBarRef.current.getBoundingClientRect().left;
      const width = progressBarRef.current.getBoundingClientRect().width;
      stopAndResetAudioContext(sourceNodeRef);
      PlayaudioPercent(audioContextRef,sourceNodeRef,grainNodeRef, bufferRef, sound, pauseAndPlay, setstartedAt,(position/width)*100);
    }

  
    useEffect(() => {
      // Update the currentTime continuously when the song is playing
      let animationFrameId;
      console.log(nextQueue?.length);
      function updateCurrentTime() {
        if (pauseAndPlay.isPlaying) {
          const currentTime = audioContextRef.current.currentTime - startedAt;
          setprogressBar(currentTime);

          if (currentTime >= bufferRef?.current?.duration && !loop && nextQueue?.length === 0 ) {
            sourceNodeRef.current.loop = false;
            setCurrentTime(0);
            setstartedAt(0);
            pauseAndPlay.setIsPlaying(false);
          }else if(currentTime >= bufferRef?.current?.duration && !loop && nextQueue?.length > 0 ){
            PlaynextFunction(dispatch, nextQueue, previousQueue, setCurrentTime, setstartedAt, audioContextRef, sourceNodeRef, grainNodeRef, bufferRef, setduration, sound, Cookie);
          } else if(currentTime >= bufferRef?.current?.duration && loop){
            setCurrentTime(0);
            setstartedAt(0);
            PlayaudioPercent(audioContextRef,sourceNodeRef,grainNodeRef, bufferRef, sound, pauseAndPlay, setstartedAt, 0);
          } else {
            animationFrameId = requestAnimationFrame(updateCurrentTime);
          }
        }
      }
      animationFrameId = requestAnimationFrame(updateCurrentTime);
      return () => cancelAnimationFrame(animationFrameId);
      // eslint-disable-next-line 
    }, [pauseAndPlay.isPlaying, startedAt, loop, currentTime, paused]);


    useEffect(()=>{
      if(grainNodeRef.current){
        grainNodeRef.current.gain.value = sound;
      }
      Stringify('volume', sound);
        // eslint-disable-next-line
    },[sound]);





    const handleLoop = ()=>{
        Stringify('LoopCondition', !loop);
        setloop(parserGet('LoopCondition'));
    }

    // useEffect(()=>{
    //   console.log(currentSong);
    // },[currentSong])



    // const dispatchAndExecute = async () => {
          
    //      dispatch(NextSong());
    // }

  return (<div className="px-2 flex w-full h-[72px] z-40">
  <div className="w-[30%] min-w-fit flex items-center">
      {currentSong ? <SongDetailsBottomBar /> : null}
  </div>
          <div className="w-[40%] min-w-[400px] max-w-[722px] flex flex-col justify-center">
             <div className="flex gap-2">

                  <div className="flex gap-2 flex-1 justify-end">

                       <button className="p-2 h-fit relative group flex items-center justify-center fade-in-text">
                          <span className="hidden group-hover:block text-[0.8rem] absolute whitespace-nowrap -top-9 text-white p-[0.35rem] px-3 rounded-[0.2rem] font-spotifyBook tracking-wider rounded-sd bg-[--home-card-hover] faded-in">Enable Shuffle</span>
                       <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon"><path className="fill-[--dark-text]  group-hover:fill-white" d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 0 0 .39 3.5z"></path><path className="fill-[--dark-text]"  d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z"></path></svg>

                       </button>

                      <div  className="p-2 h-fit relative group flex items-center justify-center fade-in-text">
                          <span className="hidden group-hover:block text-[0.8rem] absolute whitespace-nowrap -top-9   text-white p-[0.35rem] px-3 rounded-[0.2rem] font-spotifyBook tracking-wider rounded-sd bg-[--home-card-hover] faded-in">Previous</span>
                          <PreviousSongPattern>
                          <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon"><path className="fill-[--dark-text] group-hover:fill-white" d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"></path></svg>
                          </PreviousSongPattern>
                       </div>

                   </div>

                        <MusicChnager item={currentSong}>
                            <button className={`p-2 ${bufferRef.current ? "bg-white" : "bg-white/60"}  rounded-full gap-4 mb-2 h-fit relative group flex items-center justify-center fade-in-text hover:scale-105 transition-transform ease-in-out`}>
                            <span className="hidden group-hover:block text-[0.8rem] absolute whitespace-nowrap -top-9   text-white p-[0.35rem] px-3 rounded-[0.2rem] font-spotifyBook tracking-wider rounded-sd bg-[--home-card-hover] faded-in">{!pauseAndPlay.isPlaying ? "Play" : "Pause"}</span>
                               {!pauseAndPlay?.isPlaying ?  <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path></svg> : <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>}
                            </button>
                        </MusicChnager>

                   <div className="flex gap-2 flex-1">
                    
                          <div className="p-2 h-fit relative group flex items-center justify-center fade-in-text">
                               <span className="group-hover:block text-[0.8rem] absolute whitespace-nowrap -top-9   text-white p-[0.35rem] px-3 rounded-[0.2rem] font-spotifyBook tracking-wider rounded-sd bg-[--home-card-hover] faded-in">Next</span>
                               <NextSongPattern>
                                  <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon"><path className="fill-[--dark-text] group-hover:fill-white" d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"></path></svg>
                              </NextSongPattern>
                           </div>
                

                       <button onClick={handleLoop} className="p-2 h-fit relative group flex items-center justify-center fade-in-text">
                       <span className="ease-in-out text-[0.8rem] absolute whitespace-nowrap -top-9 text-white p-[0.35rem] px-3 rounded-[0.2rem] font-spotifyBook tracking-wider rounded-sd bg-[--home-card-hover] faded-in">{loop ? "Disable Repeat" : "Enable Repeat"}</span>
                        {loop ? 
                           <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" className="fill-primary">
                                    <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h.75v1.5h-.75A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5zM12.25 2.5h-.75V1h.75A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25z"></path>
                                    <path d="M9.12 8V1H7.787c-.128.72-.76 1.293-1.787 1.313V3.36h1.57V8h1.55z"></path>
                          </svg> 
                          :
                           <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon">
                               <path className="fill-[--dark-text]" d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z"></path>
                           </svg>
                        } 
                       </button>
                   </div>
             </div>
             { currentSong ? 
             <div className="flex gap-2 font-spotifyLight text-[0.6875rem] text-[--dark-text] items-center">
                  <div className="min-w-[40px] text-right">
                  {formatTime(progressBar)}
                  </div>
                               
                  <div className="w-full h-[4px] bg-white/30 rounded-full relative group flex items-center">
                      <div className="h-[8px] cursor-pointer w-full absolute z-20" ref={progressBarRef} onClick={progressBarfunction} ></div>
                      <div className="h-full group bg-white w-0 rounded-full flex justify-end items-center group-hover:bg-primary relative pl-2" style={{width : `${(progressBar/currentSong.duration)*100}%`}}>
                          <div className="h-[0.6rem] w-[0.6rem]  group-hover:block bg-white absolute rounded-full"></div>
                      </div>
                  </div>
                  <div className="min-w-[40px] text-left">
                  {formatTime(duration)}
                  </div>
             </div>
          : ""}
          </div>
          
  <div className="w-[30%] min-w-[180px] flex items-center">
      <AdditonalMusicPlayerButton sound={sound} setsound={setsound} />
  </div>
</div>
   
  );
}


export default  memo(MusicPlayer);