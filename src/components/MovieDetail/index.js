import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMovieDetail } from '../../actions/index';
import { useEffect } from 'react'


import './Movie.css';

export default function MovieDetail(props) {
  const movieId = props.match.params.id;
  const { movieDetail } = useSelector(state => state)
  const dispatch = useDispatch();
  
  const dataDetail = ()=>{
    return(
      <div className='description-container' >
        {movieDetail.Actors && (<p><h3 className='movie-description-title' >Actors:</h3> {movieDetail.Actors}</p>)}
        {movieDetail.Awards && (<p><h3 className='movie-description-title' >Awards:</h3>{movieDetail.Awards}</p>)}
        {movieDetail.BoxOffice && (<p><h3 className='movie-description-title' >Profits:</h3>{movieDetail.BoxOffice}</p>)}
        {movieDetail.Country && (<p><h3 className='movie-description-title' >Country:</h3>{movieDetail.Country}</p>)}
        {movieDetail.DVD && (<p><h3 className='movie-description-title' >Premier:</h3>{movieDetail.DVD}</p>)}
        {movieDetail.Director && (<p><h3 className='movie-description-title' >Director:</h3>{movieDetail.Director}</p>)}
        {movieDetail.Genre && (<p><h3 className='movie-description-title' >Genre:</h3>{movieDetail.Genre}</p>)}
        {movieDetail.Language && (<p><h3 className='movie-description-title' >Language:</h3>{movieDetail.Language}</p>)}
        {movieDetail.Plot && (<p><h3 className='movie-description-title' >Description:</h3>{movieDetail.Plot}</p>)}
        {movieDetail.Production && (<p><h3 className='movie-description-title' >Production:</h3>{movieDetail.Production}</p>)}
        {movieDetail.Runtime && (<p><h3 className='movie-description-title' >Runtime:</h3>{movieDetail.Runtime}</p>)}
        {movieDetail.Type && (<p><h3 className='movie-description-title' >Type:</h3>{movieDetail.Type}</p>)}
        {movieDetail.Website && (<p><h3 className='movie-description-title' >Website:</h3>{movieDetail.Website}</p>)}
        {movieDetail.Writer && (<p><h3 className='movie-description-title' >Writer:</h3>{movieDetail.Writer}</p>)}
      </div>
    )
  }
  useEffect(() => {
    dispatch(getMovieDetail(movieId))
  },[dispatch, movieId])
  return (
    <div className="movie-detail">
      <h1 className='movie-title' >{movieDetail.Title}</h1>
      <img className='img' src={movieDetail.Poster} alt={movieDetail.Title} />
      {dataDetail()}
    </div>
  );

}