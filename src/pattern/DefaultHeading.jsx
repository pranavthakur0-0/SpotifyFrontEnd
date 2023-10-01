import React, { useEffect, useMemo } from "react";

const DefaultHeading = React.memo(({ setDivWidth }) => {
    const divRef = useMemo(() => {
      return React.createRef();
    }, []);
  
    useEffect(() => {
      const observer = new ResizeObserver(entries => {
        for (const entry of entries) {
          if (entry.target === divRef.current) {
            setDivWidth(entry.contentRect.width);
          }
        }
      });
      if (divRef.current) {
        observer.observe(divRef.current);
      }
      return () => {
        observer.disconnect();
      };
    }, [divRef, setDivWidth]);
  
    return (
      <React.Fragment>
        <span className="flex items-center justify-center h-6 w-6">#</span>
        <span className="ml-4" ref={divRef}>
          Title
        </span>
        <span className="hidden remove md:block">Album</span>
        <span className="hidden remove md:block">Date added</span>
        <span className="ml-4 justify-center flex">
          <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" className="fill-[var(--dark-text)]">
            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
            <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path>
          </svg>
        </span>
      </React.Fragment>
    );
  });
  

  
  
  export default DefaultHeading;