import { useContext, useEffect, useRef, useState } from "react";
import BookmarkItem from "./BookmarkItem";
import "./BookmarkList.css"
import { BookmarkStateContext } from "../App";

const BookmarkList = () => {
    const tempBookmarks = useContext(BookmarkStateContext);
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        setBookmarks(
            tempBookmarks.map((it) => {
                return {
                    clicked: 0,
                    ...it
                };
        }));
    }, [tempBookmarks]);

    let clickedId = useRef(-1);
    const onClick = (id) => {
        let tempBookmarks = JSON.parse(JSON.stringify(bookmarks));
        if(clickedId.current !== -1) {
            tempBookmarks.map((target) => {
                if(target.id === clickedId.current) target.clicked = 0;
                return target;
            });
        }

        tempBookmarks.map((target) => {
            if(target.id === id) target.clicked = 1;
            return target;
        });
        clickedId.current = id;
        setBookmarks(tempBookmarks);
    };

    return (
        <div className="BookmarkList">
            <ul>
                <h3>Bookmark List</h3>
                {bookmarks.map((it) => (
                    <BookmarkItem key={it.id} {...it} onClick={onClick} />
                ))}
            </ul>
        </div>
    );
}

export default BookmarkList;