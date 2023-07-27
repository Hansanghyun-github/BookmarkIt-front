import ReactModal from "react-modal";
import Button from "./Button";
import ForlderList from "./FolderList";
import "./LeftMenu.css";
import { useContext } from "react";
import { DispatchContext, CreateDisplayContext } from "../App";

const LeftMenu = () => {
    const displays = useContext(CreateDisplayContext);
    const { onCreateFolder, onCreateBookmark,
            onClickBookmarkDisplay, onClickFolderDisplay, 
            closeDisplay, toLogout}
            = useContext(DispatchContext);
    const type = (displays.messages.url || displays.messages.bookmarkName || displays.messages.folderName)
                 ?"error":"default";

    // TODO useState -> useReducer and LeftMenu -> App (to prevent re-render)
    const onClickF = () => {
        onClickFolderDisplay("");
    }
    const isClosed = () => {
        closeDisplay();
    }
    const onClickB = () => {
        onClickBookmarkDisplay("", "");
    }

    const onChangeUrl = (e) => {
        onClickBookmarkDisplay(e.target.value, displays.bookmarkName);
    }
    const onChangeBookmarkName = (e) => {
        onClickBookmarkDisplay(displays.url, e.target.value);
    }
    const onChangeFolderName = (e) => {
        onClickFolderDisplay(e.target.value);
    }

    const handleOnClickFolder = () => {
        onCreateFolder(displays.folderName);
        //closeDisplay();
    }
    const handleOnClickBookmark = () => {
        onCreateBookmark(displays.url, displays.bookmarkName);
        //closeDisplay();
    }

    const onClickLogout = () => {
        toLogout();
    }

    return (
        <div>
            <ForlderList />
            <div className="NewButton">
                <div>
                    <Button type={"positive"} text={"새 폴더 추가"} onClick={onClickF}/>
                    <ReactModal className="ReactModal" isOpen={displays.isOpenF} ariaHideApp={false}>
                        <div className="Modal">
                            <span>폴더 추가</span><span className="EX">  (현재 폴더에 자동으로 추가됩니다.)</span>
                            <div className="Input">
                                <span>이름 </span><span className={`class_${type}`}>{displays.messages.folderName}</span>
                                <input value={displays.folderName} onChange={onChangeFolderName}/>
                            </div>
                            <div className="ModalButton">    
                                <button className="Cancel" onClick={isClosed}>취소</button>
                                <button className="Submit" onClick={handleOnClickFolder}>저장</button>
                            </div>
                        </div>
                    </ReactModal>
                </div>
                <div>
                    <Button type={"positive"} text={"북마크 추가"} onClick={onClickB}/>
                    <ReactModal className="ReactModal" isOpen={displays.isOpenB} ariaHideApp={false}>
                        <div className="Modal">
                            <span>북마크 추가</span><span className="EX">  (현재 폴더에 자동으로 추가됩니다.)</span>
                            <div className="Input">
                                <span>url </span>
                                <span className={`class_${type}`}>{displays.messages.url}</span>
                                <input value={displays.url} onChange={onChangeUrl}/>
                            </div>
                            <div className="Input">
                                <span>이름 </span>
                                <span className={`class_${type}`}>{displays.messages.bookmarkName}</span>
                                <input value={displays.bookmarkName} onChange={onChangeBookmarkName}/>
                            </div>
                            <div className="ModalButton">    
                                <button className="Cancel" onClick={isClosed}>취소</button>
                                <button className="Submit" onClick={handleOnClickBookmark}>저장</button>
                            </div>
                        </div>
                    </ReactModal>
                </div>
                <div>
                    <Button type={"negative"} text={"로그아웃"} onClick={onClickLogout}/>
                </div>
            </div>
        </div>
    )
};

export default LeftMenu;