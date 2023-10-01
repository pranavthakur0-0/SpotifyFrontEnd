import { useContext } from "react";
import { MenuContext } from "../components/Context";

export default function PopUpComp({show}){
    console.log("hello");
    const {message, color} = useContext(MenuContext);
    return (<>
     {show ? <div key={new Date().getTime()} className={` font-spotifyLight absolute tracking-wider text-center rounded-md text-white z-30  m-auto text-base px-8 w-fit py-3 max-w-[320px] bottom-28 left-0 h-fit right-0 grid place-items-center fade-in-out `} style={{backgroundColor : `var(${color})`}}>
                {message}
      </div> : null}
      </>)
}