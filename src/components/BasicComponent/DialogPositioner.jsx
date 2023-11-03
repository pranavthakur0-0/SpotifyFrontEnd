import React, { useState, useRef, useEffect, Children, cloneElement } from 'react';

const DialogPositioner = (props) => {
  const [position, setPosition] = useState('below');
  const [height, setHeight] = useState(0);
  const buttonRef = useRef(null);

  useEffect(() => {
    
      if (buttonRef.current) {
        const boxRect = buttonRef.current.getBoundingClientRect();
        const screenHeight = window.innerHeight;
        const distanceFromBottom = Math.abs(screenHeight - boxRect.top);
        console.log(height, "height" , distanceFromBottom, "Distance from bottom");
        if (height + 0 < distanceFromBottom) {
          setPosition("bottom");
        } else {
          setPosition("top");
        }
      }
      
  }, [height]);


  console.log(height);

  return (
    <div className={`absolute`}
     style={position === "top" ? {bottom : `${height + 40}px`} : {top : `2.5rem`} }
     ref={buttonRef}>
      {Children.map(props.children, child => cloneElement(child, { setHeight }))}
    </div>
  );  
};

export default DialogPositioner;
