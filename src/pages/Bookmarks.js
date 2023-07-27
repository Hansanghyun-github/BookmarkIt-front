import { useContext, useEffect } from "react";
import BookmarkList from "../component/BookmarkList";
import Header from "../component/Header";
import LeftMenu from "../component/LeftMenu";
import "./Bookmarks.css";
import { DispatchContext } from "../App";

const Bookmarks = () => {
    const {getAllBookmarksAndFolders} = useContext(DispatchContext);
    useEffect(() => {
        getAllBookmarksAndFolders();
    }, []);

    return (
        <div className="Bookmarks">
            <Header />
            <div className="List">
                <LeftMenu />
                <BookmarkList />
            </div>
            {/* menu */}
        </div>
    );
}

export default Bookmarks;