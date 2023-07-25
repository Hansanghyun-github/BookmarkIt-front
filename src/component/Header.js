import Button from "./Button";
import "./Header.css"

const Header = () => {
    return (
        <div className="Header">
            <div className="Span">
                <span>BookmarkIt</span>
            </div>
            <div className="Input">
                <input type="search" placeholder="북마크 검색..." />
            </div>
        </div>
    );
};

export default Header;