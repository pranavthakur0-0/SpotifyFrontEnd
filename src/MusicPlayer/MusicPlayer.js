
// import { authenticatedPostRequest } from "../utils/ServerHelpers";

import { parserGet } from "../utils/StorageFun";


export async function fetchAndDecodeAudio(audioContextRef, audioElementRef,sourceNodeRef, grainNodeRef, bufferRef, playingTrack, setduration, sound, Cookie) {
  // If there's an ongoing request, cancel it
  if (fetchAndDecodeAudio.controller) {
    fetchAndDecodeAudio.controller.abort();
  }
  
  // Create an AbortController and signal to allow cancellation
  const controller = new AbortController();
  const { signal } = controller;

  // Store the controller to track the ongoing request
  fetchAndDecodeAudio.controller = controller;

   audioElementRef.current = new Audio();
  
  // Check if there's an audio source playing, and if so, stop it and reset the context
  if (audioContextRef.current) {
    stopAndResetAudioContext(audioElementRef.current, sourceNodeRef);
  }

  audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
  sourceNodeRef.current = audioContextRef.current.createMediaElementSource(audioElementRef.current);
  sourceNodeRef.current.connect(audioContextRef.current.destination);

  const url = playingTrack.track;

  fetch(url, { signal })
    .then(response => response.body)
    .then(body => {
      const reader = body.getReader();
      return new ReadableStream({
        start(controller) {
          function pump() {
            return reader.read().then(({ done, value }) => {
              if (done) {
                controller.close();
              } else {
                controller.enqueue(value);
                pump();
              }
            });
          }
          pump();
        }
      });
    })
    .then(stream => new Response(stream))
    .then(response => response.blob())
    .then(blob => {
      const objectURL = URL.createObjectURL(blob);
      audioElementRef.current.src = objectURL;
      setduration(playingTrack.duration);
      // Start playing as soon as enough data is available
      const sound = parserGet('volume');
      audioElementRef.current.volume =  sound ? sound : 1 ;
      audioElementRef.current.play();
    })
    .catch(error => {
      // Ignore abort errors as they are expected
      if (error.name === 'AbortError') {
        return;
      }  
      console.error('Error streaming audio:', error);
    });
}



export async function starterfetchAndDecodeAudio(audioContextRef, audioElementRef, sourceNodeRef, playingTrack, setduration) {
  try {
    // Set up the audio context and elements
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    audioElementRef.current = new Audio();
    sourceNodeRef.current = audioContextRef.current.createMediaElementSource(audioElementRef.current);
    sourceNodeRef.current.connect(audioContextRef.current.destination);

    // Fetch and decode the audio
    fetch(playingTrack?.track)
      .then(response => response.body)
      .then(body => {
        const reader = body.getReader();
        return new ReadableStream({
          start(controller) {
            function pump() {
              return reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                } else {
                  controller.enqueue(value);
                  pump();
                }
              });
            }
            pump();
          }
        });
      })
      .then(stream => new Response(stream))
      .then(response => response.blob())
      .then(blob => {
        const objectURL = URL.createObjectURL(blob);
        audioElementRef.current.src = objectURL;

        // Attach an event listener for when the audio is ready to play
        audioElementRef.current.oncanplaythrough = () => {
          setduration(playingTrack.duration);
        };
      })
      .catch(error => {
        if (error.name !== 'AbortError') {
          console.error("Error loading or decoding audio", error);
        }
      });
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error("Error loading or decoding audio", error);
    }
  }
}





export function Playaudio(audioContextRef, audioElementRef, sourceNodeRef, grainNodeRef, bufferRef, setstartedAt, startTime = 0) {
  const sound = parserGet('volume');
  audioElementRef.current.volume = sound ? sound : 1;

  if (audioElementRef.current?.src) {
    audioElementRef.current.play().catch(error => {
      console.error("Playback cannot be started yet", error);
    });
  }
}


export function stopAndResetAudioContext(audioElement, sourceNodeRef) {
  if (audioElement) {
    audioElement.pause();
    audioElement.currentTime = 0;
  }

  if (sourceNodeRef.current) {
    sourceNodeRef.current.disconnect();
  }
}



       
 export function pauseAudio(audioContextRef,audioElementRef, sourceNodeRef, setstartedAt, startedAt) {
    audioElementRef.current.pause();
  }


 export function PlayaudioPercent(audioElementRef, skipPercentage = 0) {
      if (audioElementRef.current.paused || audioElementRef.current.currentTime > 0) {
        const sound = parserGet('volume');
        audioElementRef.current.volume =  sound ? sound : 1 ;
        audioElementRef.current.play();
      }
      if (audioElementRef.current) {
        const newTime = (skipPercentage / 100) * audioElementRef?.current?.duration;
        audioElementRef.current.currentTime = newTime;
      }
  }


  



export function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
