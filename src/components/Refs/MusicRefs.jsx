import { createContext, useContext, useRef } from 'react';

const MusicPlayerRefsContext = createContext();

export function MusicPlayerRefsProvider({ children }) {
  const audioContextRef = useRef(null);
  const audioElementRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const grainNodeRef = useRef(null);
  const bufferRef = useRef(null);

  const audioRefs = {
    audioContextRef,
    audioElementRef,
    sourceNodeRef,
    grainNodeRef,
    bufferRef,
  };

  return (
    <MusicPlayerRefsContext.Provider value={audioRefs}>
      {children}
    </MusicPlayerRefsContext.Provider>
  );
}

export default function useMusicPlayerRefs() {
  return useContext(MusicPlayerRefsContext);
}
