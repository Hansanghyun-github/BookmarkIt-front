import { useContext, useEffect, useRef, useState } from "react";
import FolderItem from "./FolderItem";
import "./FolderList.css"
import { FolderStateContext } from "../App";

const initFolders = (it) => {
    it.clicked = 0;
    it.children.map((child) => initFolders(child));
}

let flag = false;
const changeClicked = (child, id, value) => {
    if(flag === true) return;

    if(child.id === id) {
        child.clicked = value;
        flag = true;
    }
    child.children.map((it) => changeClicked(it, id, value));
}

const ForlderList = () => {
    const tempFolders = useContext(FolderStateContext);
    const [folders, setFolders] = useState([]);
    let clickedId = useRef(0);

    useEffect(() => {
        const tempFolders2 = tempFolders;
        tempFolders2.map((it)=> initFolders(it));
        const target = tempFolders2.find((target) => target.name === "root")
        //target.clicked = 1;
        if(target) {
            target.clicked = 1;
            clickedId.current = target.id;
            console.log("target: " + target);
        }
        setFolders(tempFolders2);
    }, [tempFolders]);

    const onClick = (id) => {
        let tempFolders = JSON.parse(JSON.stringify(folders));
        
        flag = false;
        tempFolders.map((it) => changeClicked(it, clickedId.current, 0));
        flag = false;
        tempFolders.map((it) => changeClicked(it, id, 1));
        clickedId.current = id;
        setFolders(tempFolders);
    };

    const recursiveAccess = (target) => {
        return (
            target.map((it) => (
                <ul>
                    <li><FolderItem key={it.id} id={it.id} name={it.name} clicked={it.clicked} onClick={onClick}/></li>
                    {recursiveAccess(it.children)}
                </ul>
            ))
        );
    };

    return (
        <div className="FolderList">
            {recursiveAccess(folders)}
        </div>
    );
}

export default ForlderList;