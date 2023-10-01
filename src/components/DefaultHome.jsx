import List from "../pages/List.jsx";
import useResizeObserver from "../utils/Resizer";

const DefaultHome = () => {
  const { containerRef, column, compo } = useResizeObserver();

  return (
    <div className="flex relative h-fit flex-col">
      <div className="py-2 h-fit w-full">
        <div className="px-5 flex h-fit flex-col gap-6" ref={containerRef}>
          <List column={column} compo={compo} />
        </div>
        <div className="absolute w-full h-80 bg-white top-0 home-default"></div>
      </div>
    </div>
  );
};
export default DefaultHome;
