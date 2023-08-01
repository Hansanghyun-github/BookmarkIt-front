import { useNavigate } from "react-router-dom";
import Button from "../component/Button";
import "./Home.css";
import MainPage from "../img/MainPage.png"
import NewBookmark from "../img/NewBookmark.gif"
import NewFolder from "../img/NewFolder.gif"


const Home = () => {
    const navigate = useNavigate();
    const goLoginPage = () => {
        navigate("/login");
    };

    return (
        <div className="Home">
            <h1>📚BookmarkIt</h1>
            <h2>여러분이 즐겨찾는 웹사이트를 BookmarkIt에 저장하세요!</h2>
            <img className="MainImg" src={MainPage} alt=""/>
            <h2>⚙ BookmarkIt을 활용하면 여러 웹사이트를 저장하여 생산성을 높일 수 있습니다 ⚙</h2>
            <div className="divGIF">
                <img className="GIF" src={NewBookmark} alt=""/>
                <img className="GIF" src={NewFolder} alt=""/>
            </div>
            <div className="HomeButton">
                <Button type={"positive"} onClick={goLoginPage} text={"로그인"}/>
            </div>
        </div>
    );
}

export default Home;