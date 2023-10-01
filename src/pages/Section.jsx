
import { useParams } from "react-router-dom";
import data from "../components/data.json";
import Card from "../components/Card";
import useResizeObserver from "../utils/Resizer";

const Section = () => {
  const { id } = useParams();
  const { containerRef, column, compo } = useResizeObserver();

  return (
      <div className="flex relative h-fit flex-col">
        <div className="h-fit w-full p-8">
      <div className="z-10 relative" ref={containerRef}>
      {data && data.filter((item) => item.id === id).map((item) => {
    const { playlist } = item;
    return (
      <div className="" key={item.id}>
        <h3 className="text-white text-3xl pb-6">{item.title}</h3>
        <div className="home_default_grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${column}, minmax(0, 1fr))`, transition: 'width 0.3s ease',}}>
          <Card playlists={playlist} compo={compo} column={column} />
        </div>
      </div>
    );
  })}
    </div>
    <div className="absolute w-full h-80 bg-white top-0 left-0 home-default"></div>
    </div>
    </div>
  );
}

export default Section;