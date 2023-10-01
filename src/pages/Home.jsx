import StarterHome from "./StarterHome.jsx";
import ContextProvider from "../context/contextProvider.js";
import { createContext, memo, useState } from "react";
import { MusicPlayerRefsProvider } from "../components/Refs/MusicRefs.jsx";
import { parserGet } from "../utils/StorageFun.js";
import { Provider } from "react-redux";
import {Store} from "../components/Store/store.js"

export const TimeContext = createContext(null);

const Home = () => {
  const [startedAt, setstartedAt] = useState(null);
  const [duration, setduration] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [sound, setsound] = useState(parserGet('volume'));
  const [paused, setpaused] = useState(parserGet('paused') || false);
  return (
    <MusicPlayerRefsProvider>
      <TimeContext.Provider value={{ startedAt, setstartedAt, duration, setduration, currentTime, setCurrentTime, sound, setsound, paused, setpaused }}>
        <ContextProvider>
          <Provider store={Store}>
            <StarterHome />
        </Provider>
        </ContextProvider>
      </TimeContext.Provider>
    </MusicPlayerRefsProvider>
  );
};

export default memo(Home);
