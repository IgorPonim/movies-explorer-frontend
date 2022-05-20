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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import React from 'react';

import { LikedMoviesContext } from '../../contexts/LikedMoviesContext';




function App() {

  const [InfoToolOpen, setInfoToolOpen] = useState(false)
  const [InfoToolStatus, setInfoToolStatus] = useState(false)
  const [loggedIn, setloggedIn] = useState(false)

  const history = useHistory();

  function showToolTip() {
    setInfoToolOpen(true)
  }


  useEffect(() => {

    MainApi.getUserInfo()
      .then((res) => {
        if (res) {
          // console.log(res)
          history.push('/movies')
          setloggedIn(true);
          setCurrentUser(res)

        } else {
          setloggedIn(false);
          history.push('/')
        }
      })
      .catch((error) => {
        console.log(error)
      })

  }, [loggedIn, history])


  //регистрация имя пароль мыло
  function handleRegister({ email, password, name }) {
    MainApi.register(email, password, name)
    handleLogin({ email, password })
      .then(() => {
        console.log('успешно')
        showToolTip()
        setInfoToolStatus(true)
        setloggedIn(true)

        history.push('/movies')
      })

      .catch((err) => {
        showToolTip()
        setInfoToolStatus(false)
        console.log(err)
      })
  }


  //логин по мылу и паролю
  function handleLogin({ email, password }) {
    MainApi.authorize(email, password)
      .then((res) => {
        setloggedIn(true)
      })
      .catch((err) => {
        console.log(err)
        setInfoToolOpen(true)
        setInfoToolStatus(false)
      })
  }

  //вначале загружу массив карточек
  const [movies, setMovies] = useState([])
  const [LikedMovies, setLikedMovies] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(false)
  const [currentUser, setCurrentUser] = useState({})



  useEffect(() => {
    if (loggedIn) {
      MainApi.getUserInfo()
        .then((res) => {
          setCurrentUser(res)
          history.push('/movies')

        })
        .catch((error) => {
          console.log(error)

        });
    }
    else { history.push('/') }
  }, [loggedIn, history])



  //выхожу чищу кеш
  function handleLogout() {
    MainApi.logout()
      .then(() => {
        setCurrentUser({})
        history.push('/')
        localStorage.clear('movies');
        localStorage.clear('searchMovies');
        localStorage.clear('searchMoviesCashe');
        localStorage.clear('resultinSAVEDmovies');
        localStorage.clear('resultinallmovies')
        setloggedIn(false);
      })
      .catch((err) => {
        setInfoToolOpen(true)
        setInfoToolStatus(false)
        console.log(err);
      })
  }

  //обновляю данные
  function handleUpdateUserInfo({ email, name }) {
    MainApi.updateUserInfo(email, name)
      .then((res) => {
        setInfoToolOpen(true)
        setInfoToolStatus(true)
        setCurrentUser(res)
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

        <LikedMoviesContext.Provider value={{ LikedMovies, updateLikedMovies: setLikedMovies, isLoading: loadingMovies }}>
          <Switch>
            <Route path={'/'} exact>
              <Main />
            </Route>
            <ProtectedRoute loggedIn={loggedIn} path={'/movies'} exact>
              <Movies />
            </ProtectedRoute>
            <ProtectedRoute loggedIn={loggedIn} path={'/saved-movies'} exact>
              <SavedMovies />
            </ProtectedRoute>
            <ProtectedRoute loggedIn={loggedIn} path={'/profile'} exact>
              <Profile changeInfo={handleUpdateUserInfo} handleLogOut={handleLogout} />
            </ProtectedRoute>
            <Route path={'/signup'} exact>
              <Register onRegister={handleRegister} />
            </Route>
            <Route path={'/signin'} exact>
              <Login loggedIn={handleLogin} />
            </Route>

            <Route path='*'>
              <NotFound />
            </Route>

          </Switch>
          <InfoToolTip isOpen={InfoToolOpen} status={InfoToolStatus} onClose={() => setInfoToolOpen(false)} />
        </LikedMoviesContext.Provider>

      </ CurrentUserContext.Provider >
    </div>

  );
}

export default App;
