import BookmarkList from "../component/BookmarkList";
import Header from "../component/Header";
import LeftMenu from "../component/LeftMenu";
import "./Bookmarks.css";

const Bookmarks = () => {
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