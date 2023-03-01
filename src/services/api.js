import axios from "axios";

//Base da URL:https://api.themoviedb.org/3
//URL da API:https://api.themoviedb.org/3/movie/now_playing?api_key=beef1c8d70b520607baa6e2f394ef210&laguage=pt-BR

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3'
});
export default api;
