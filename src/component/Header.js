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
            <div className="NewButton">
                <Button type={"positive"} text={"새 폴더 추가"} />
                <Button type={"positive"} text={"북마크 추가"} />
            </div>
        </div>
    );
};

export default Header;