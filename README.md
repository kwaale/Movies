# Movies SPA de busqueda de peliculas

## *[Deploy - Ver en web](https://movies-sand.vercel.app/)*

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

Comenzamos por actions

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

Seguimos con el reducer

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

Seguimos con la store

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

Conectamos la store a la app

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




```js
```


Con tu App podremos:

* Buscar películas y listarlas.
* Poder ver todos los detalles de una película en particular.
* Poder agregar las películas a tu lista de favoritos.
* Poder sacar películas de tu lista de favoritos.



### Comenzamos

Para poder comenzar tenemos que instalar las dependencias que utilizaremos. Tendran en el `package.json` ya las dependencias. Ahora hacemos:

```javascript
npm install
```
Dentro de nuestra carpeta `components` tendremos subcarpetas con nuestros nuestro archivo.js y .css para tener mas acomodado nuestro codigo.
En la carpeta `components` tenemos 4 subcarpetas: `Buscador`. `Favorites`, `Movie`, `NavBar`. Y en cada una crearemos sus respectivos archivos .js y .css.
`NavBar.js` sera nuestro Header que nos permitira navegar por nuestras rutas.
`Buscador.js` sera nuestro Home, en donde buscaremos peliculas (llamando a la API) y las mostraremos en forma de lista.
En `Favorites.js` mostraremos la lista de peliculas a las cuales seleccionamos como Favoritas.
Y por ultimo en `Movie.js` sera nuestro compente en donde mostraremos una pelicula en detalle. Accedemos a este componente haciendo click dentro de nuestro buscador o en nuestras favoritas.

### Creamos nuestras Actions

En nuestro archivo `index.js` en nuestra carpeta actions. Por ahora vamos a crear 4 actions. Una para hacer la request a la API y traer todas las peliculas `getMovies`,otra para traer los detalles de la pelicula especifica `getMovieDetail`, a otra para agregarlas como Favoritas `addMovieFavorite` y otra para eliminarla de favoritas `removeMovieFavorite`.

> Abajo tienes un par de ejemplos, para las dos que faltan tienes que investigar y hacerlo por tu propia cuenta. La api que usamos es `http://www.omdbapi.com/`

```javascript
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
Cada accion devuelve un objecto, la primera key de este objeto es el `type`, su valor lo ponemos nosotros, por convencion se usan mayusculas y guion bajo (_) para separar. Como segundo argumento recibe un `payload`, que son datos que puede llevar que usaremos en nuestro reducer para actualizar el estado. En `addMovieFavorite` el payload que pasaremos cuando hagamos un dispatch de esa action sera el nombre de la Pelicula.En `removeMovieFavorite`,nuestro payload sera la pelicula a eliminar. En `getMovies`, nuestro payload sera el objeto que recibamos de nuestra request. En `getMovieDetail`, el payload sera el objeto con los detalles de la pelicula que seleccionamos.

### Creamos nuestro Reducer

Vamos al archivo `index.js` en nuestra carpeta reducers. Como vimos, un reducer es simplemente una funcion que recibe 2 parametros: state y action. Y depende la `action` que reciba nos devuelve el estado actualizado. Al comienzo del archivo creamos nuestro estado inicial. Lo llamamos `initialState`:

```javascript
const initialState = {
  movies: [],
  moviesLoaded: [],
  movieDetail: {}
};
```
Vamos a  `movies`.`moviesLoaded` y `movieDetail`.
Tienes que crear los 4 reducers para las 4 acciones que creamos anteriormente que son:`getMovies`, `getMovieDetail`, `removeMovieFavorite`,`addMovieFavorite`

> Aca abajo le dejamos dos ejemplos, vas a tener que crear los dos restantes

```javascript
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

Ya tenemos la base de nuestro reducer. Como sabemos el `initialState` es inmutable, por eso a la hora del return, hacemos una copia de este, con sintaxis de ES6 (spread operator) otra opcion seria usar `Object.assign({}, state, ...)`, y nos devuelve nuestro `state` actualizado. Exportamos el reducer para poder usarlo en nuestro store. Para entenderlo mejor pueden leer [aca](https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns).



### Armamos nuestro store

Ahora pasamos a crear nuestro Store Global que tendra todo nuestro State. Vamos a nuestro archivo `index.js` en nuestra carpeta store, tenemos que importar `CreateStore` de 'redux', por ahora nos deberia quedar asi:

```javascript
import { createStore } from "redux";

const store = createStore();

export default store;
```
La funciton `createStore` recibe argumentos. Primero le pasaremos nuestro `rootReducer` y despues nuestro Middleware para poder hacer peticiones asincronas en nuestro codigo.

### Conectamos el Store con nuestro rootReducer y Middleware

Ya tenemos nuestro Reducer y nuestras actions. Entonces terminamos de conectar nuestro store, para esto importamos `applyMiddleware` de 'redux', `thunk` de la libreria 'redux-thunk' y nuestro Reducer. Pasamos como parametros en `createStore` nuestro rootReducer y applyMiddleware, a esta le pasamos nuestro middleware `thunk`.
Puedes investigar sobre `thunk` en  [aca](https://github.com/reduxjs/redux-thunk).
Usamos un Middleware para poder hacer peticiones AJAX sin problemas. Nos quedaria algo asi:

```javascript
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
```

### Conectamos nuestro Store con nuestra App de React

Es hora de conectar todo. Para eso necesitaremos de un componente que nos brinda la libreria 'react-redux', que se llama `Provider`. En nuestro Provider llamamos a nuestro store, y con este envolvemos a toda nuestra App, para tener acceso a nuestro store desde cualquier componente hijo.

```javascript
//root index.js

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
```
Ya tenemos nuestro STORE conectado con nuestra App!

### Conectamos nuestro componente con nuestro Store

Usamos las funciones `mapStateToProps` y `mapDispatchToProps` dentro de nuestros componentes. La primera nos permite traer nuestro state global como props a nuestro componente, y la segunda nos permite hacer el `dispatch` de nuestras actions al store. Y para terminar de conectar nuestro componente con el store global usamos una HoC ( High Order Component ) que importamos de la libreria 'react-redux' que se llama `connect`. En nuestro componente `Buscador.js` nos deberia quedar algo asi:

```javascript
//Buscador.js 

function mapStateToProps(state) {
  return {
    movies: state.moviesLoaded
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMovieFavorite: movie => dispatch(addMovieFavorite(movie)),
    getMovies: title => dispatch(getMovies(title))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Buscador);
```

