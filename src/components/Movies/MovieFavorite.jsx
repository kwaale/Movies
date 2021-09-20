import { NavLink } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { removeMovieFavorite } from '../../actions';
import './Movies.css';

export default function MovieFavorite({movie}) {
    const dispatch = useDispatch();
    return(
        <div className='movie-favorite-container'>
            <div className='btn-container'>
                <button className='btn-eliminar' onClick={() => dispatch(removeMovieFavorite(movie.imdbID))}>
                &#128465;
                </button>
            </div>
            <NavLink className='title-img-container' to={`/movie/${movie.imdbID}`}>
                <h1>{movie.Title}</h1>
                <img className='img-movie-favorite' src={movie.Poster} alt={movie.Title} />
            </NavLink>
            <div className='year-type-container'>
                <p>Año: {movie.Year}</p>
                <p>Tipo: {movie.Type}</p>
            </div>
        </div>
    )

} 