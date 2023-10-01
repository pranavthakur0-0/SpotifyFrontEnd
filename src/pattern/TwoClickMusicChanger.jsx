import { memo, useEffect, useRef, useState } from "react";

function TwoClickMusicChanger({ children }) {
  const [openDialogIndex, setOpenDialogIndex] = useState(null);
  const buttonRef = useRef(null);

  const handleOpenDialog = (e, index) => {
    e.stopPropagation();
    if (index === openDialogIndex) {
      setOpenDialogIndex(null);
    } else {
      setOpenDialogIndex(index);
    }
  };

  const closeDialog = () => {
    setOpenDialogIndex(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        closeDialog();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      {children({ handleOpenDialog, openDialogIndex, setOpenDialogIndex, buttonRef })}
    </>
  );
}

export default memo(TwoClickMusicChanger);
