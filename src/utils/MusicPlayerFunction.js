
import { fetchAndDecodeAudio } from "../MusicPlayer/MusicPlayer";
import { SetcurrentSong, setNextQueue, setPreviousQueue } from "../components/slice/QueueSlice";
export const PlaynextFunction = (
    dispatch,
    nextQueue,
    previousQueue,
    setCurrentTime,
    setStartedAt,
    audioContextRef,
    audioElementRef,
    sourceNodeRef,
    grainNodeRef,
    bufferRef,
    setduration,
    sound,
    Cookie
) => {
    const [nextCurrentSong, ...remainingSongs] = nextQueue;
    const previousQueueData = [...previousQueue, nextQueue];
    dispatch(setPreviousQueue(previousQueueData));
    dispatch(SetcurrentSong(nextCurrentSong));
    dispatch(setNextQueue(remainingSongs));
    setCurrentTime(0);
    setStartedAt(0);
    fetchAndDecodeAudio(
        audioContextRef,
        audioElementRef,
        sourceNodeRef,
        grainNodeRef,
        bufferRef,
        nextCurrentSong,
        setduration,
        sound,
        Cookie
    );
}
