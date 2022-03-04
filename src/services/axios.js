import axios from "axios";

const instance = axios.create({
    baseURL: 'https://sablox.herokuapp.com/api/'
});

export default instance;