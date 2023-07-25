import React, { useContext } from "react";
import "./FolderItem.css"
import { DispatchContext } from "../App";

const FolderItem = ({id, name, clicked}) => {
    const {onDeleteFolder, onClickFolder} = useContext(DispatchContext);
    const btnType = (clicked === 1) ? "Click" : "Default";
    const handleOnClick = () => {
        onClickFolder(id);
    };
    const handleOnDelete = (e) => {
        if(window.confirm("정말 삭제하시겠습니까? (하위 폴더와 북마크는 자동으로 삭제됩니다)")){
            onDeleteFolder(id, name);
        }
        e.stopPropagation();
    }

    return (
        <button 
         className={["FolderButton", `FolderButton_${btnType}`].join(" ")}
         onClick={handleOnClick}
        >
            📁{" " + name}
            <span className="DeleteSpan">
                <button className="DeleteButton" onClick={handleOnDelete}>X</button>
            </span>
        </button>
    );
};

export default React.memo(FolderItem);