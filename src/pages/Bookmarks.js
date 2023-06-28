import BookmarkList from "../component/BookmarkList";
import Button from "../component/Button";
import ForlderList from "../component/FolderList";
import Header from "../component/Header";
import "./Bookmarks.css";

const Bookmarks = () => {
    return (
        <div className="Bookmarks">
            <Header />
            <div className="List">
                <ForlderList />
                <BookmarkList />
            </div>
            {/* menu */}
        </div>
    );
}

export default Bookmarks;