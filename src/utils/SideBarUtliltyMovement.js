import { useEffect, useState } from "react";
import { authenticatedGetRequest } from "./ServerHelpers";

export function useResizable(ref, refRight, initialWidth) {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const resizeableEle = ref.current;
    resizeableEle.style.width = `${initialWidth}px`;

    let width = initialWidth;
    let x = 0;

    const onMouseMoveRightResize = (event) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width = width + dx;

      const resize = () => {
        if (width >= 280) {
          resizeableEle.style.width = `${width}px`;
        }
      };

      requestAnimationFrame(resize);
      setIsDragging(true);
    };

    const onMouseUpRightResize = () => {
      document.removeEventListener("mousemove", onMouseMoveRightResize);
      document.body.style.userSelect = "auto";
      setIsDragging(false);
    };

    const onMouseDownRightResize = (event) => {
      x = event.clientX;  // Set the initial x position when you start dragging
      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
      document.body.style.userSelect = "none";
      resizeableEle.style.transition = "none";
      setIsDragging(true);
    };

    const resizerRight = refRight.current;
    resizerRight.addEventListener("mousedown", onMouseDownRightResize);

    return () => {
      resizerRight.removeEventListener("mousedown", onMouseDownRightResize);
    };
    // eslint-disable-next-line
  }, [ref, refRight]);

  return isDragging;
}




export const handleCreatePlaylist = async (Cookie, Login) => {
  
  if (Object.keys(Cookie).length === 0) {
    Login.setneedLogin(true);
  } else {
    const route = '/playlist';
   const response = await authenticatedGetRequest(route, Cookie);
   if(response){
    return response;
   } 
  }
};


