const initialState = {
    moviesFavorite: JSON.parse(localStorage.getItem('movies')) || [],
    moviesLoaded: [],
    movieDetail: {}
  };

  function rootReducer(state = initialState, action) {
    if (action.type === "ADD_MOVIE_FAVORITE") {
        return {
          ...state,
          //Si ya existe la pelicula, no la agrega a favoritos
          moviesFavorite: state.moviesFavorite.find(m=>m.imdbID === action.payload.imdbID)
          ?
          state.moviesFavorite
          :
          state.moviesFavorite.concat(action.payload)
        };
    }
    if (action.type === "REMOVE_MOVIE_FAVORITE") {
      return {
        ...state,
        moviesFavorite: state.moviesFavorite.filter(movie=>movie.imdbID !== action.payload)
    };
  }
    if (action.type === "GET_MOVIES") {
      return {
          ...state,
          moviesLoaded: action.payload.Search
        };
      }
      if (action.type === "GET_MOVIE_DETAIL") {
      return {
        ...state,
        movieDetail: action.payload
      };
  }
    return state;
  }
  
  export default rootReducer;