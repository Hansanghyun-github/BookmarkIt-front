import "./BookmarkItem.css"

const BookmarkItem = ({id, url, explantion, clicked, onClick}) => {
    const btnType = (clicked === 1) ? "Clicked" : "Default";
    const onDoubleClick = () => {
        alert(url);
    };
    const handleOnClick = () => {
        onClick(id);
    }

    return (
        <div className="BookmarkItem">
            <button 
             className={["ItemButton", `ItemButton_${btnType}`].join(" ")}
             onClick={handleOnClick}
             onDoubleClick={onDoubleClick}>
                <span>{explantion}&nbsp;&nbsp;&nbsp;</span>
                <span className={"url_" + btnType}>{url}</span>
            </button>
        </div>
    );
}

export default BookmarkItem;