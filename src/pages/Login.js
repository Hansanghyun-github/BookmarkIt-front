import LoginPage from "../component/LoginPage";
import Oauth2Page from "../component/Oauth2Page";
import "./Login.css";

const Login = () => {
    return (
        <div className="Login">
            <LoginPage />
            <Oauth2Page />
        </div>
    );
}

export default Login;