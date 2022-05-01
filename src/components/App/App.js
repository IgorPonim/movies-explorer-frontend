import logo from '../../logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import { Main } from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Profile } from '../Profile/Profile';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { Header } from '../Header/Header';
import { NotFound } from '../NotFound/notFound';

function App() {
  return (

    <Switch>

      <Route path={'/'} exact>
        <Main />
      </Route>
      <Route path={'/movies'} exact>
        <Movies />
      </Route>
      <Route path={'/saved-movies'} exact>
        <SavedMovies />
      </Route>
      <Route path={'/profile'} exact>
        <Profile />
      </Route>
      <Route path={'/signup'} exact>
        <Register />
      </Route>
      <Route path={'/signin'} exact>
        <Login />
      </Route>
      <Route path={'*'}>
        <NotFound />
      </Route>
    </Switch>

  );
}

export default App;
