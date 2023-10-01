import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSong } from "../../context/contextProvider";
import SongListHome from "../../components/SongListHome";
import { useSelector } from "react-redux";
import { playlistThumbnail } from "../../utils/ImageResizer";


export default function SearchMain(){
    const SongSearch =  useSelector(state=>state.Search.songs);
    const mainRes = useSelector(state=>state.Search.mainResult);
    const { favList } = useSong();
    const [favlistId, setfavlistId] = useState(null);
    useEffect(()=>{
        setfavlistId(new Set(favList.favId));
    },[favList.favId]);

    return (<>    
            <div className="w-full flex min-h-[20rem] p-[2rem] gap-[0.5rem] h-fit  text-white">
                <div className="w-fit max-w-[30rem]">
                {SongSearch && mainRes ? (
                   <Link to={`/song/${mainRes._id??mainRes._id}`}>
                    <div className="p-4 pt-2">
                        <h3 className="text-2xl mb-4">Top result</h3>
                        <div className="p-5 w-[25rem] flex flex-col gap-7 flex-1 bg-[#181818] cursor-pointer hover:bg-[var(--hover-main-search)] rounded-lg transition ease-in-out">
                            <img className="rounded w-24 h-24 object-cover"
                                 src={playlistThumbnail(mainRes.thumbnail??mainRes.thumbnail)}
                                 alt={mainRes.thumbnail ??mainRes.thumbnail} />
                            <div className="flex flex-col">
                                <span className="text-[1.7rem] block truncate max-w-[23rem]">
                                    {mainRes.name ?? mainRes.name}
                                </span>
                                <div className="flex mt-3">
                                    <span className="block text-white font-spotifyLight hover:underline underline-offset-1">
                                        {mainRes.artistDetails.username ?? mainRes.artistDetails.username}
                                    </span>
                                    <span className="text-[0.85rem] ml-5 bg-[#131313] hover:bg-[#242323] px-3 py-1 rounded-full">
                                        {mainRes.type??mainRes.type}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Link>
                ) : null}
                </div>

                {SongSearch ?
                    <div className="flex-1 p-4 pt-2">
                        <h3 className="text-2xl mb-4">Songs</h3>
                        {favlistId ? SongSearch.map((item) => {
                            const isFavorite = favlistId.has(item._id);
                            return (
                                <SongListHome currentPlaylist={{_id : "search"}} key={item._id} item={item} isFavorite={isFavorite} />
                            );
                        }) : null}
                       
                    </div>
                    : null
                }

            </div> 
  </>)
}