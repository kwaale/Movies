const apikey = '19b95e4c'

export function addMovieFavorite(payload) {
    return {
        type: "ADD_MOVIE_FAVORITE",
        payload
    };
}

export function removeMovieFavorite(payload) {
    return {
        type: "REMOVE_MOVIE_FAVORITE",
        payload
    };
}

export function getMovieDetail(params) {
    return function (dispatch) {
        return fetch(`https://www.omdbapi.com/?apikey=${apikey}&i=${params}`)
        .then(response => response.json())
        .then(json => {
            dispatch(
                {
                    type: "GET_MOVIE_DETAIL",
                    payload: json
                });
            }); 
        }
    }
    
    export function getMovies(titulo) {
        return function (dispatch) {
        return fetch(`https://www.omdbapi.com/?apikey=${apikey}&s=${titulo}`)
            .then(response => response.json())
            .then(json => {
                dispatch(
                    {
                        type: "GET_MOVIES",
                        payload: json
                    });
            });
    };
}