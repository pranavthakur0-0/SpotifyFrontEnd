import { memo } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
function SideBarHomeSearch() {
  const location = useLocation();
  return (
    <div className="w-full h-fit text-white bg-[var(--background-base)] flex flex-col gap-0 px-3 py-2 rounded-md">
       <Link to="/">
      <div className="h-[40px] px-3 py-1 cursor-pointer group flex items-center gap-5 box-content">
        {location.pathname === "/" ? (
          <svg
            role="img"
            height="24"
            width="24"
            aria-hidden="true"
            className="fill-white"
            viewBox="0 0 24 24"
            data-encore-id="icon"
          >
            <path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z"></path>
          </svg>
        ) : (
          <svg
            role="img"
            height="24"
            width="24"
            aria-hidden="true"
            className="fill-[#b3b3b3;] group-hover:fill-white"
            viewBox="0 0 24 24"
            data-encore-id="icon"
          >
            <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z"></path>
          </svg>
        )}
        <span
          className={` group-hover:text-white ${
            location.pathname === "/" ? "text-white" : "text-[#b3b3b3]"
          }`}
        >
          Home
        </span>
      </div>
      </Link>
      <Link to="/search">
      <div className="h-[40px] px-3 py-1 cursor-pointer group flex items-center gap-5 box-content">
        {location.pathname === "/search" ? (
          <svg
            role="img"
            height="24"
            width="24"
            aria-hidden="true"
            className="fill-white"
            viewBox="0 0 24 24"
            data-encore-id="icon"
          >
            <path d="M15.356 10.558c0 2.623-2.16 4.75-4.823 4.75-2.664 0-4.824-2.127-4.824-4.75s2.16-4.75 4.824-4.75c2.664 0 4.823 2.127 4.823 4.75z"></path>
            <path d="M1.126 10.558c0-5.14 4.226-9.28 9.407-9.28 5.18 0 9.407 4.14 9.407 9.28a9.157 9.157 0 0 1-2.077 5.816l4.344 4.344a1 1 0 0 1-1.414 1.414l-4.353-4.353a9.454 9.454 0 0 1-5.907 2.058c-5.18 0-9.407-4.14-9.407-9.28zm9.407-7.28c-4.105 0-7.407 3.274-7.407 7.28s3.302 7.279 7.407 7.279 7.407-3.273 7.407-7.28c0-4.005-3.302-7.278-7.407-7.278z"></path>
          </svg>
        ) : (
          <svg
            role="img"
            height="24"
            width="24"
            aria-hidden="true"
            className="fill-[#b3b3b3;] group-hover:fill-white"
            viewBox="0 0 24 24"
            data-encore-id="icon"
          >
            <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path>
          </svg>
        )}
        <span
          className={` group-hover:text-white ${
            location.pathname === "/search" ? "text-white" : "text-[#b3b3b3]"
          }`}
        >
        Search
        </span>
      </div>
      </Link>
    </div>
  );
}

export default memo(SideBarHomeSearch);