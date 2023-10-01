import { useEffect, useRef, useState } from 'react';

const useResizeObserver = () => {
  const containerRef = useRef(null);
  const [column, setColumn] = useState();
  const [compo, setCompo] = useState();

  useEffect(() => {
    const observeResize = () => {
      const comp = containerRef.current;
      const resizeObserver = new ResizeObserver((entries) => {
        const componentWidth = comp.offsetWidth;
        const columnCount = Math.floor(componentWidth / 210);
        setColumn(columnCount);
        setCompo(comp.offsetWidth + 200);
      });

      resizeObserver.observe(comp);

      return () => {
        resizeObserver.unobserve(comp);
        resizeObserver.disconnect();
      };
    };

    observeResize();
  }, []);

  return { containerRef, column, compo };
};

export default useResizeObserver;
