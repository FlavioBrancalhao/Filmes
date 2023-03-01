import { useEffect, useState } from "react";
import { Await, useParams, useNavigate, json } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import './filme.css'


function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    
    useEffect(() =>{
        async function loadFilme(){
           await api.get(`/movie/${id}`,{
            params:{
                api_key: "beef1c8d70b520607baa6e2f394ef210",
                language:"pt-BR",
            }
           })
           .then((response)=>{
            setFilme(response.data);
            setLoading(false);
            
           })
           .catch(()=>{
            navigate("/", {replace: true});
          })
        }
        loadFilme();

        return () => {
            console.log("COMPONENTE FOI DESMONTADO")
          }
    }, [navigate, id])

    function salvarFilme(){
      const minhaLista = localStorage.getItem("@primeflix");
      let filmesSalvos = JSON.parse(minhaLista) || [];
      const hasFilme = filmesSalvos.some((filmesSalvos)=> filmesSalvos.id === filme.id);
      if(hasFilme){
        toast.warn("Esse filme ja esta salvo");
        return;
      }
      filmesSalvos.push(filme);
      localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
      toast.success("filme Salvo com sucesso")
    }

    if(loading){
        return(
          <div className="filmeInfo">
            <h1>Carregando detalhes...</h1>
          </div>
        )
      }
      
    return(
        <div className="filmeInfo">
    <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>

      <strong>Avalição: {filme.vote_average} / 10</strong>

      <div className="areaButton">
        <button onClick={salvarFilme}>Salvar</button>
        <button><a target="_blank" rel="external"href={`https://www.youtube.com/results?search_query=${filme.title} trailer` }>Trailer</a></button>
      </div>

        </div>
    )
}

export default Filme;