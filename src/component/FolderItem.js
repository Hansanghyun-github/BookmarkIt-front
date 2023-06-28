import { useEffect } from "react";
import "./FolderItem.css"

const FolderItem = ({id, name, clicked, onClick}) => {
    const btnType = (clicked === 1) ? "Click" : "Default";
    const handleOnClick = () => {
        onClick(id);
    };

    return (
        <button 
         className={["FolderButton", `FolderButton_${btnType}`].join(" ")}
         onClick={handleOnClick}
        >
            📁{" " + name}
        </button>
    );
};

export default FolderItem;