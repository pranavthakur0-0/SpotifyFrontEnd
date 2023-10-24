
import { authenticatedPostRequest } from "../utils/ServerHelpers";

export async function fetchAndDecodeAudio(audioContextRef, sourceNodeRef, grainNodeRef, playingTrack, setduration, sound, Cookie) {
  try {
    // Create an AbortController and signal to allow cancellation
    const controller = new AbortController();
    const { signal } = controller;

    // If there's an ongoing request, cancel it
    if (fetchAndDecodeAudio.controller) {
      fetchAndDecodeAudio.controller.abort();
    }

    // Store the controller to track the ongoing request
    fetchAndDecodeAudio.controller = controller;

    const chunkSize = 1024 * 1024; // Adjust the chunk size as needed

    // Initialize the audio context if not already created
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    // Initialize the source and gain nodes
    sourceNodeRef.current = audioContextRef.current.createBufferSource();
    grainNodeRef.current = audioContextRef.current.createGain();
    grainNodeRef.current.connect(audioContextRef.current.destination);
    sourceNodeRef.current.connect(grainNodeRef.current);
    grainNodeRef.current.gain.setValueAtTime(sound, 0);

    let offset = 0;
    let duration = 0;

    // Fetch and play audio in chunks
    while (offset < playingTrack.duration) {
      if (controller.signal.aborted) {
        return;
      }

      const startByte = offset;
      const endByte = Math.min(offset + chunkSize, playingTrack.duration);
      const range = `bytes=${startByte}-${endByte}`;

      const response = await fetch(playingTrack.track, {
        headers: { Range: range },
        signal,
      });

      if (controller.signal.aborted) {
        return;
      }

      const audioData = await response.arrayBuffer();
      const audioBuffer = await audioContextRef.current.decodeAudioData(audioData);

      sourceNodeRef.current.buffer = audioBuffer;

      // Play the chunk
      sourceNodeRef.current.start(audioContextRef.current.currentTime + duration);
      duration += audioBuffer.duration;

      offset = endByte + 1;
    }

    setduration(duration);

    if (Cookie) {
      const route = "/currentSong";
      const body = playingTrack;
      await authenticatedPostRequest(route, Cookie, body);
    }
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error("Error loading or decoding audio", error);
    }
  }
}



export async function starterfetchAndDecodeAudio(audioContextRef, sourceNodeRef, grainNodeRef, bufferRef, playingTrack, setduration, sound, Cookie, check) {
  try {

    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    stopAndResetAudioContext(sourceNodeRef);

    const response = await fetch(playingTrack.track); // Pass the signal to the fetch
    const audioData = await response.arrayBuffer();
    const audioBuffer = await audioContextRef.current.decodeAudioData(audioData);
    bufferRef.current = audioBuffer;
    setduration(audioBuffer.duration);
    
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error("Error loading or decoding audio", error);
    }
  }
}


export function stopAndResetAudioContext(sourceNodeRef) {
  if (sourceNodeRef.current) {
    sourceNodeRef.current.stop();
    sourceNodeRef.current.disconnect();
    sourceNodeRef.current = null;
  }
}



 export function Playaudio(audioContextRef,sourceNodeRef, grainNodeRef, bufferRef, sound, setstartedAt, startTime = 0) {
     if (bufferRef.current) {
         const currentTime = audioContextRef.current.currentTime;
         stopAndResetAudioContext(sourceNodeRef);
         
         audioContextRef.current.resume();

         sourceNodeRef.current = audioContextRef.current.createBufferSource();
         sourceNodeRef.current.buffer = bufferRef.current;
         // Create the gain node
         grainNodeRef.current = audioContextRef.current.createGain();
         grainNodeRef.current.connect(audioContextRef.current.destination);
         sourceNodeRef.current.connect(grainNodeRef.current);
         // Start with full volume (gain value of 1)
         grainNodeRef.current.gain.setValueAtTime(sound, 0);
         // Define the time over which to decrease the volume (e.g., 1 second)
        
         
         sourceNodeRef.current.start(0, Math.abs(startTime));
         setstartedAt(currentTime - Math.abs(startTime));
     }
 }


       
 export function pauseAudio(audioContextRef, sourceNodeRef, setstartedAt, startedAt) {
  
    if (sourceNodeRef.current) {
      const currentTime = audioContextRef.current.currentTime;
      sourceNodeRef.current.stop();
      sourceNodeRef.current = null; // Reset the reference to the AudioBufferSourceNode
      setstartedAt(currentTime - startedAt); // Update the startedAt time to account for the elapsed time
      audioContextRef.current.suspend();
    }
  }


  function createSourceNodeContext(audioContextRef,sourceNodeRef,grainNodeRef, audioBuffer, sound){

    sourceNodeRef.current = null;
    sourceNodeRef.current = audioContextRef.current.createBufferSource();
    sourceNodeRef.current.buffer = audioBuffer;
    // Create the gain node
    grainNodeRef.current = audioContextRef.current.createGain();
    grainNodeRef.current.connect(audioContextRef.current.destination);
    sourceNodeRef.current.connect(grainNodeRef.current);
    // Start with full volume (gain value of 1)
    grainNodeRef.current.gain.setValueAtTime(sound, 0);

  }


 export function PlayaudioPercent(audioContextRef,sourceNodeRef, grainNodeRef, bufferRef, sound, pauseAndPlay, setstartedAt, skipPercentage = 0) {
    if (bufferRef.current) {
      const currentTime = audioContextRef.current.currentTime;
      const startTime = (skipPercentage / 100) * bufferRef.current.duration;
      const audioBuffer =  bufferRef.current;
      createSourceNodeContext(audioContextRef,sourceNodeRef,grainNodeRef, audioBuffer, sound);
      sourceNodeRef.current.start(0, startTime);
      pauseAndPlay.setIsPlaying(true);
      setstartedAt(currentTime - startTime);
    }
  }


  



export function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
