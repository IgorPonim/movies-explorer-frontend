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
import { useEffect, useState } from 'react';
import { moviesApi } from '../../utils/MoviesApi';
import * as MainApi from '../../utils/MainApi.js'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import InfoToolTip from '../InfoToolTip/InfoToolTip';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js'




function App() {

  const [InfoToolOpen, setInfoToolOpen] = useState(false)
  const [InfoToolStatus, setInfoToolStatus] = useState(false)
  const [loggedIn, setloggedIn] = useState(false)



  function showToolTip() {
    setInfoToolOpen(true)
  }


  function handleRegister(email, password, name) {
    MainApi.register(email, password, name)
      .then(() => {
        console.log('успешно')
        showToolTip()
        setInfoToolStatus(true)
        history.push('/signin')
      })
      .catch((err) => {
        showToolTip()
        setInfoToolStatus(false)
        console.log(err)
      })
  }

  function handleLogin(email, password) {
    MainApi.authorize(email, password)
      .then((res) => {

        setloggedIn(true)
        history.push('/')
      })
      .catch((err) => {
        console.log(err)
        setInfoToolOpen(true)
        setInfoToolStatus(false)
      })
  }
  const history = useHistory();


  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    MainApi.getUserInfo()
      .then((res) => {
        if (res) {
          setloggedIn(true);
          setCurrentUser(res)

        } else {
          setloggedIn(false);
        }
      })
      .catch((error) => {
        console.log(error)
      });

  }, [])

function handleLogout(){

    MainApi.logout()
      .then(() => {
        setloggedIn(false);
        history.push('/')
      })
      .catch((err) => {
        setInfoToolOpen(true)
        setInfoToolStatus(false)
        console.log(err);
      })
  }


  return (
    <div className='page'>
      < CurrentUserContext.Provider value={currentUser}>
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
            <Profile handleLogOut={handleLogout} />
          </Route>
          <Route path={'/signup'} exact>
            <Register onRegister={handleRegister} />
          </Route>
          <Route path={'/signin'} exact>
            <Login loggedIn={handleLogin} />
          </Route>
          <Route path={'*'}>

            <NotFound />
          </Route>
        </Switch>
        <InfoToolTip isOpen={InfoToolOpen} status={InfoToolStatus} onClose={() => setInfoToolOpen(false)} />
      </ CurrentUserContext.Provider >
    </div>

  );
}

export default App;
