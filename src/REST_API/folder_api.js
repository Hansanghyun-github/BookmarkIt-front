import axios from "axios"

export const findAllFolder = () => {
    axios.get("http://localhost:8080/folders")
    .then((response) => {
        
    })
    .catch((error) => console.log(error));
}