import { memo } from "react";
import { useMenu } from "../context/contextProvider";
import { v4 as uuidv4 } from "uuid";

function PopupComp() {
  const { toastMessage, toastColor } = useMenu();
  return (
    <div
      key={uuidv4()}
      className={` font-spotifyLight absolute tracking-wider text-center rounded-md text-white z-[100]  m-auto text-base px-8 w-fit py-3 max-w-[320px] bottom-28 left-0 h-fit right-0 grid place-items-center fade-in-out `}
      style={{ backgroundColor: `var(${toastColor.color})` }}
    >
      {toastMessage.message}
    </div>
  );
}

export default memo(PopupComp);
