import './Favorites.css';
import { useSelector, useDispatch } from "react-redux";
import MovieFavorite from "../Movies/MovieFavorite";
import logoFavoritos from "../../img/LogoFavoritos.gif"

export default function ConnectedList() {
  const { moviesFavorite } = useSelector(state => state)
  localStorage.setItem('movies', JSON.stringify(moviesFavorite));
  return (
    <div className='movies-favorite-container'>
      {moviesFavorite.length ?
      moviesFavorite.map(movie => {
        return (
          <MovieFavorite key={movie.imdbID} movie={movie} />
        )
      }):
      <img className='cont-img-favorite' src={logoFavoritos} alt="Busca tu pelicula en favoritos"/>
      }
    </div>
  )
}