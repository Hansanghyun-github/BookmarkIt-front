import React, { useContext } from "react";
import FolderItem from "./FolderItem";
import "./FolderList.css"
import { FolderStateContext } from "../App";

const ForlderList = () => {
    const folders = useContext(FolderStateContext);

    const recursiveAccess = (target) => {
        return (
            target.map((it) => (
                <ul>
                    <li><FolderItem key={it.id} id={it.id} name={it.name} clicked={it.clicked}/></li>
                    {recursiveAccess(it.children)}
                </ul>
            ))
        );
    };
    return (
        <div>    
            <div className="FolderList">
                <h3>Folder List</h3>
                {recursiveAccess(folders)}
            </div>
        </div>
    );
}

export default React.memo(ForlderList);