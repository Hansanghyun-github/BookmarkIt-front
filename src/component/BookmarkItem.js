import { useContext } from "react";
import "./BookmarkItem.css"
import { DispatchContext, UpdateDisplayContext } from "../App";
import ReactModal from "react-modal";

const BookmarkItem = ({id, url, explantion, clicked, directoryId}) => {
    const updateDisplay = useContext(UpdateDisplayContext);
    const type = (updateDisplay.messages.url || updateDisplay.messages.bookmarkName)
                 ?"error":"default";

    const {
        onUpdateBookmark, onDeleteBookmark, onClickBookmark, onClickBookmarkUpdate, closeUpdateDisplay
    } = useContext(DispatchContext);
    const btnType = (clicked === 1) ? "Clicked" : "Default";
    const onDoubleClick = () => {
        alert(url);
    };
    const handleOnClick = () => {
        onClickBookmark(id);
    }

    const handleOnDelete = (e) => {
        if(window.confirm("정말 삭제하시겠습니까?")){
            onDeleteBookmark(id);
        }
        e.stopPropagation();
    }

    const onClickUpdate = (e) => {
        onClickBookmarkUpdate(url, explantion);
        e.stopPropagation();
    }
    const isClosed = () => {
        closeUpdateDisplay();
    }

    const onChangeUrl = (e) => {
        onClickBookmarkUpdate(e.target.value, updateDisplay.bookmarkName);
    }
    const onChangeExplantion = (e) => {
        onClickBookmarkUpdate(updateDisplay.url, e.target.value);
    }
    
    const handleOnUpdate = () => {
        console.log("update button clicked!");
        onUpdateBookmark(id, updateDisplay.url, updateDisplay.bookmarkName, directoryId);
        closeUpdateDisplay();
    }


    return (
        <div className="BookmarkItem">
            <div
             className={["ItemButton", `ItemButton_${btnType}`].join(" ")}
             onClick={handleOnClick}
             onDoubleClick={onDoubleClick}>
                <span>{explantion}&nbsp;&nbsp;&nbsp;</span>
                <span className={"url_" + btnType}>{url}</span>
                <span className="Buttons">
                    <button className="Update_Button" onClick={onClickUpdate}>수정</button>
                    <button className="Delete_Button" onClick={handleOnDelete}>삭제</button>
                </span>
            </div>
                <ReactModal className="ReactModal" isOpen={updateDisplay.isOpen} ariaHideApp={false}>
                    <div className="Modal">
                        <span>북마크 수정</span>
                        <div className="Input">
                            <span>url</span>
                            <span className={`class_${type}`}>{updateDisplay.messages.url}</span>
                            <input value={updateDisplay.url} onChange={onChangeUrl}/>
                        </div>
                        <div className="Input">
                            <span>이름</span>
                            <span className={`class_${type}`}>{updateDisplay.messages.bookmarkName}</span>
                            <input value={updateDisplay.bookmarkName} onChange={onChangeExplantion}/>
                        </div>
                        <div className="ModalButton">    
                            <button className="Cancel" onClick={isClosed}>취소</button>
                            <button className="Submit" onClick={handleOnUpdate}>저장</button>
                        </div>
                    </div>
                </ReactModal>
        </div>
    );
}

export default BookmarkItem;