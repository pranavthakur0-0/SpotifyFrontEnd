import { useEffect, useRef, useState } from "react";
import useMusicPlayerRefs from "../Refs/MusicRefs";
import { parserGet, Stringify} from "../../utils/StorageFun";

const volume = parserGet('volume');
export default function AdditionalMusicPlayerButton() {
  const {audioElementRef} = useMusicPlayerRefs();
  const [sound, setsound] = useState(volume ? volume : 1);

  const soundbarRef = useRef();
  const isDraggingRef = useRef(false); // To track if the soundbar is being dragged
  const [hover, sethover] = useState();
    
  const handleSoundBar = (e) => {
    const position = e.clientX - soundbarRef.current.getBoundingClientRect().left;
    const width = soundbarRef.current.getBoundingClientRect().width;
    const newSoundValue = Math.round((position / width) * 100) / 100;
    setsound(newSoundValue);
  };
  useEffect(()=>{

    if (audioElementRef && audioElementRef.current) {
      audioElementRef.current.volume = sound;
    }
    Stringify('volume', sound);
    
  },[sound, audioElementRef])

  const handleMouseDown = () => {
   
    isDraggingRef.current = true;
  };

  const handleMouseUp = () => {
    sethover(false);
    isDraggingRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (isDraggingRef.current) {
        sethover(true);
      handleSoundBar(e);
    }
  };


  const handleSound = ()=>{
    if(sound!==0){
        setsound(0);
    }else{
        setsound(0.30);
    }
  }

  useEffect(() => {
    // Add event listeners for mouse events
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    // Clean up event listeners when component unmounts
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(sound< 0){
        isDraggingRef.current = false;
        setsound(0);
    }
    if(sound>1){
        setsound(1);
        isDraggingRef.current = false;
    }
    // eslint-disable-next-line
  }, [sound]);

  return (
    <>
      <div className="flex justify-end w-full">
        <div className="flex gap-2 items-center">
          <button onClick={handleSound} className="fill-[var(--dark-text)] hover:fill-white">
            {sound*100 >65  ?  <svg role="presentation" height="18" width="18" aria-hidden="true" aria-label="Volume high" id="volume-icon" viewBox="0 0 16 16" data-encore-id="icon"><path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path><path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path></svg> : null} 
            {sound*100 >=30 && sound*100 <= 65 ?  <svg role="presentation" height="18" width="18" aria-hidden="true" aria-label="Volume medium" id="volume-icon" viewBox="0 0 16 16" data-encore-id="icon"><path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a2.999 2.999 0 0 1 0 5.175v1.649z"></path></svg> : null}
            {sound*100 > 0 && sound*100 < 30 ?  <svg role="presentation" height="18" width="18" aria-hidden="true" aria-label="Volume low" id="volume-icon" viewBox="0 0 16 16" data-encore-id="icon"><path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path></svg> : null}
            {sound*100 === 0 ? <svg role="presentation" height="18" width="18" aria-hidden="true" aria-label="Volume off" id="volume-icon" viewBox="0 0 16 16" data-encore-id="icon"><path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path><path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path></svg> : null}
          </button>
            <div className="min-w-[100px] flex-1 max-w-[130px] h-1 relative flex w-full items-center rounded-sm bg-white/30  group">
                    <div ref={soundbarRef} onMouseOver={()=>sethover(true)} onMouseLeave={()=>sethover(false)} onMouseDown={handleMouseDown} onClick={handleSoundBar} className="absolute h-[0.6rem] w-full z-10 cursor-pointer"></div>
                    <div className="h-full w-[50%] flex rounded-sm justify-end items-center bg-white group-hover:bg-[#1db954]"  style={{ width: `${sound*100}%` }}>
                     <div className="translate-x-1 absolute h-[0.6rem] w-[0.6rem] rounded-full hidden bg-white group-hover:block" style={{display : (isDraggingRef.current || hover ? "block" : "none"),  }}></div>
                </div>
          </div>
        </div>
      </div>
    </>
  );
}
