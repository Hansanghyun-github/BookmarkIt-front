import { useContext, useEffect, useRef, useState } from "react";
import BookmarkItem from "./BookmarkItem";
import "./BookmarkList.css"
import { BookmarkStateContext } from "../App";

const BookmarkList = () => {
    const bookmarks = useContext(BookmarkStateContext);
    return (
        <div className="BookmarkList">
            <ul>
                <h3>Bookmark List</h3>
                {bookmarks.map((it) => (
                    <BookmarkItem key={it.id} {...it}/>
                ))}
            </ul>
        </div>
    );
}

export default BookmarkList;