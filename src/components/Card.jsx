import { Link } from "react-router-dom"
export default function Card({playlists, compo , column}){
    return  (playlists && playlists.map((list, index) => (
        <Link key={index} to={`/playlist/${list.id}`}>
        <div className="bg-[var(--home-card)] h-full p-4 rounded-md hover:bg-[var(--home-card-hover)] transition-colors ease-in cursor-pointer group" style={{ height: `${compo / column}px` }} key={index}>
                  <div className="relative">
                      <img loading="lazy" src={list.imgage} alt={index} />
                      <div className="absolute right-1 p-[0.6rem] bg-primary rounded-full bottom-1 opacity-0 group-hover:opacity-100 group-hover:bottom-2 transition-all ease-in-out duration-[350ms]">
                          <svg role="img" height="28" width="28" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path></svg>
                      </div>
                  </div>
                  <div className="pt-2 gap-2 text-white flex flex-col">
                      <h5>{list.title}</h5>
                      <div className="text-[0.815rem] h-10 line-clamp-2 font-spotifyLight tracking-[0.03rem] text-[var(--dark-text)]">{list.desciption}</div>
                  </div>
        </div>
        </Link>
      )))
}