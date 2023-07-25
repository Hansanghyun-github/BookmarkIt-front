import axios from "axios";
import QueryString from "qs";

export const loginAPI = (id, password) => {
    axios({
        method: 'post',
        url: 'http://localhost:8080/login',
        data: "username=" + id + "&" + "password=" + password,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
        }
    })
    .then((response) => {
        console.log(response);
        return response.status === 200;
    })
    .catch((error) => {
        console.log(error);
        return false;
    });
};

export const joinAPI = (username, password, passwordCheck) => {
    axios({
        method:'post',
        url: 'http://localhost:8080/join',
        data: {
            username,
            password,
            passwordCheck,
        },
        headers: {
            'Content-type': 'application/json',
        }
    })
    .then((response) => {
        console.log(response);
        return response.status === 200;
    })
    .catch((error) => {
        console.log(error);
        return false;
    })
};