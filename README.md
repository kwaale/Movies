# Movies SPA de busqueda de peliculas

## *[Deploy - Ver en web](https://movies-search-nine.vercel.app/)*

Es una Single Page Aplication, hecha con React y Redux, en la que se puede:

<li>Buscar peliculas o juegos en el input , busca por cada carácter que se introduce.
<li>Guarda en Favoritos, las películas al presionar el botón favoritos.
<li>Elimina de favoritos, con botón de eliminar o simplemente con volver a tocar el boton favoritos.
<li>Muestra el detalle de la película, con hacer click en la caratula.

La tome para aplicar conocimientos en React Redux, es una aplicación que nos dan como ejercicio en *[Henry](https://www.soyhenry.com)*, le hice modificaciones particulares para diferenciarla y montarla en mi portfolio.
Para verla en funcionamiento es tan simple con hacer click *[aqui](https://movies-sand.vercel.app/
)*


# Esto que sigue es un Instructivo de como implementar redux que seguire acomodando.

# Redux OMDB APP

## Instalar React Redux
```js
npm install 
```

### Comenzamos por actions

```js
export function addMovieFavorite(payload) {
  return { type: "ADD_MOVIE_FAVORITE", payload };
}

export function getMovies(titulo) {
  return function(dispatch) {
    return fetch("http://www.omdbapi.com/?apikey=20dac387&s=" + titulo)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "GET_MOVIES", payload: json });
      });
  };
}
```

### Seguimos con el reducer

```js
function rootReducer(state = initialState, action) {
  if (action.type === "ADD_MOVIE_FAVORITE") {
      return {
        ...state,
        movies: state.movies.concat(action.payload)
      }
  }
  if (action.type === "GET_MOVIES") {
      return {
        ...state,
        moviesLoaded: action.payload.Search
      };
  }
  return state;
}

export default rootReducer;
```

### Seguimos con la store

```js
import { createStore } from "redux";

const store = createStore();

export default store;


const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
```

### Conectamos la store a la app

```js
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
```