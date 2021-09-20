import Favorites from "../Favorites";
import Movies from "../Movies";
import NavBar from "../NavBar";
import { Route } from "react-router-dom";
import MovieDetail from "../MovieDetail";
import './AppRouter.css';
import Footer from "../Footer";

function AppRouter() {
  return (
<div className='router-container'>
    <Route path="/" component={NavBar}/>
    <Route exact path="/" component={Movies} />
    <Route path="/" component={Footer}/>
    <Route path="/favs" component={Favorites} />
    <Route path="/movie/:id" component={MovieDetail} />
</div>
  );
}

export default AppRouter;