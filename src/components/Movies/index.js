import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { addMovieFavorite, removeMovieFavorite, getMovies } from '../../actions';
import bucaPeli from '../../img/BuscaPeli.gif';
import './Movies.css';

const Movies = () => {
  const { moviesLoaded, moviesFavorite } = useSelector(state => state);
  const dispatch = useDispatch();
  
  const randomSearch = ()=>{
    const busquedas = ["spider", "batman", "wolf", "back", "zorro", "bugs"]
    const index = Math.floor(Math.random()*busquedas.length)
    return busquedas[index]
  }

  useEffect(()=>{
    if(moviesLoaded && moviesLoaded.length === 0) dispatch(getMovies(randomSearch()))
  },[dispatch, moviesLoaded]);

  const movieFavorite = (movie) => {
    const find = moviesFavorite.find(mf => mf.imdbID === movie.imdbID);
    if (!find) dispatch(addMovieFavorite( movie ))
    else dispatch(removeMovieFavorite(movie.imdbID))
  }

  const card = (movie) => {
    return (
      <NavLink to={`/movie/${movie.imdbID}`}>
          <img className='poster' src={movie.Poster ? movie.Poster : bucaPeli} alt={movie.Title} />
      </NavLink>
    )
  }
  
  return (
      <div className='movies-container'>
        {moviesLoaded !== undefined ? 
          moviesLoaded.map(movie => {
            if (moviesFavorite.find(m => m.imdbID === movie.imdbID)) {
              return (
                <div className='movie-container' key={movie.imdbID}>
                  {card(movie)}
                  <button
                    className='favorite-false'
                    onClick={() => movieFavorite( movie)}>&#11088;</button>
                </div>
              )
            } else {
              return (
                <div className='movie-container' key={movie.imdbID}>
                  {card(movie)}
                  <button
                    className='favorite-true'
                    onClick={() => movieFavorite( movie )}>&#9733;</button>
                </div>
              )
            }
          })
          :
          <div className='movies-container'>
            <NavLink to='/'>
            <img className='img-busca-peli' src={bucaPeli} alt='Busca tu peli'/>
            </NavLink>
          </div>
        }
      </div>
  )
}
export default Movies;