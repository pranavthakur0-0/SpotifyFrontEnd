import React from "react";
import Card from "../components/Card.jsx";
import data from "../components/data.json";
import { Link } from "react-router-dom";

export default function List({ column, compo }) {
  return data.map((item, index) => {
    const playlists = item.playlist?.slice(0, column) || [];
    const showAll = item.playlist?.length > column;

    return (
      <div key={index} className="z-10 w-full h-fit p-2">
        <header className="flex justify-between mb-4 items-center">
          <h3 className="text-white text-2xl cursor-pointer hover:underline">
            <Link to={`/section/${item.id}`}>{item.title}</Link>
          </h3>
          {showAll && (
            <span className="text-[var(--dark-text)] text-sm hover:underline cursor-pointer hover:text-white">
              <Link to={`/section/${item.id}`}>Show all</Link>
            </span>
          )}
        </header>
        <div
          className="home_default_grid"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${column}, minmax(0, 1fr))`,
            transition: "width 0.3s ease",
          }}
        >
          <Card playlists={playlists} compo={compo} column={column} />
        </div>
        {column > 0 && playlists.length < column && <div className="bg-white"></div>}
      </div>
    );
  });
}
