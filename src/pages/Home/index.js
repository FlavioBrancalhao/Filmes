import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import './home.css'

//https://api.themoviedb.org/3/movie/now_playing?api_key=beef1c8d70b520607baa6e2f394ef210&laguage=pt-BR
function Home(){
    const [filmes, setFilmes] =useState([])
    const [loading, setLoading] = useState(true)


    useEffect(()=>{
        async function loadFilmes(){
            const response = await api.get("movie/now_playing", { 
                params:{
                api_key: "beef1c8d70b520607baa6e2f394ef210",
                language:"pt-BR",
                page: "1",
            }})
            setFilmes(response.data.results.slice(0, 10));
            setLoading(false)
        }
        

        loadFilmes();
    })
   
    if(loading)
    {
        return(
            <div className="loadingFilmes">
                <h2>Carregando filmes</h2>

            </div>
        )
    }

    

    return(
      <div className="container">
        <div className="listaFilme">
            {filmes.map((filmes)=> {
                return(
                    <article key={filmes.id}>
                        <strong>{filmes.title}</strong>
                        <img src={`https://image.tmdb.org/t/p/original/${filmes.poster_path}` }/>
                        <Link to={`/filme/${filmes.id}`}>Acessar</Link>
                    </article>
                )
            })}

        </div>
      </div>
    )
}

export default Home;