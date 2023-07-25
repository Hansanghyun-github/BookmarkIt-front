import axios from "axios"

export const findAllBookmark = () => {
    axios.get("http://localhost:8080/bookmarks")
    .then((response) => {
        console.log(response.data);
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    });
}

export const createBookmark = (data) => {
    axios.post(
        "http://localhost:8080/bookmarks",
        data,
        {
            headers:{
                'Content-type': 'application/json', 
                'Accept': 'application/json' 
            }
        }
    )
    .then((response) => {
        console.log(response.data);
        return "ok";
    })
    .catch((error) => {
        console.log(error);
        return "not ok";
    })
}

export const updateBookmark = () => {

}