import './MoviesCardList.css'
import { MoviesCard } from '../MoviesCard/MoviesCard'
import { useCallback, useContext, useEffect, useState } from 'react'
import { moviesApi } from '../../utils/MoviesApi'

import { SearchForm } from '../SearchForm/searchForm'
import { LikedMoviesContext } from '../../contexts/LikedMoviesContext'
import { Preloader } from '../Preloader/Preloader'
import { useHistory } from 'react-router-dom'
import '../ButtonContainer/ButtonContainer.css'


export const MoviesCardList = () => {
const history = useHistory()
    const [movies, setMovies] = useState([])

    //повешу слушатель на размер окошка
    const [size, setSize] = useState(0)

    function resize() {
        setSize(document.body.offsetWidth)
    }

    //теперь нужно задать сколько я отображаю карточек в зависимости от размера окна, 
    //и на сколько элементов я могу расширить массив 

    const [moviesCount, setMoviesCount] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [newPage, setNewPage] = useState(0)

    useEffect(() => {
        resize()
        if (size >= 768) {
            setMoviesCount(12)
            setPageCount(3)
        } else if (size <= 450) {
            setMoviesCount(5)
            setPageCount(2)
        }
        else if (size < 768)
            return setMoviesCount(8)

    }, [size]);

    //виртуальный DOM решает конечно
    function pushTheButtonToLoadMore() {
        setNewPage(newPage + 1)
    }

    useEffect(() => {
        window.addEventListener('resize', () => {
            setTimeout(() => {
                resize()
            }, 300)
        });
    }, [])


    const [errorMessage, setErrorMEsage] = useState('')
    const [filteredMovies, setFilteredMovies] = useState([])

    //загружаю карточки в локалсторадж
    useEffect(() => {
        const movieDataInStorage = localStorage.getItem('movies');
        if (movieDataInStorage) {
            setMovies(JSON.parse(movieDataInStorage));
        } else {
            moviesApi.getInitialMovies()
                .then(data => {
                    setMovies(data);
                    localStorage.setItem('movies', JSON.stringify(data));
                });
        }
    }, []);
   

    //функция поиска, вроде фурычит
    const [preloader, setPreloader] = useState(false)

    function search({ searchMessage, checkboxStatus }) {
        if (parametr.length > 0) { setFilteredMovies([]) }
        setPreloader(true)
      
        const regex = new RegExp(searchMessage, 'i')
        setErrorMEsage('')
        setTimeout(() => {
            let res = []


            res = movies
                .filter(({ nameRU }) => regex.test(nameRU))
                .filter(({ duration }) => checkboxStatus ? duration < 40 : true)
            //надо было на Python идти

            if (res.length === 0) { setErrorMEsage('Ничего не найдено 😢') }
            localStorage.setItem('searchParams', JSON.stringify({ searchMessage, checkboxStatus, res }));
            localStorage.setItem('resultinallmovies', JSON.stringify(res ));
            setPreloader(false)

            setFilteredMovies(res)
            // setcashe(res)
        }, 350);


    }

    const [cashe, setcashe] = useState([])
    useEffect(() => {
        
        const res = localStorage.getItem('resultinallmovies')
       if (res) { setcashe(JSON.parse(res))}
        setFilteredMovies(cashe)
    },[ movies])

    //переножу контекст лайкнутых
    const { LikedMovies, updateLikedMovies } = useContext(LikedMoviesContext)

    //лайкаем или удаляем 
    const onLikeMovie = ((data) => {
        return () => {
            const isLikedMovie = LikedMovies.find(({ movieId }) => movieId === data.id)
            if (isLikedMovie) {
                moviesApi.removeMovie(isLikedMovie._id)
                    .then(() => {
                        updateLikedMovies(LikedMovies.filter(({ _id }) => _id !== isLikedMovie._id))
                    })
            } else {

                moviesApi.createMovie(data).then((res) => {
                    updateLikedMovies([...LikedMovies, res]);
                })
            }
        }
    })


    //вот так я скрываю кнопочку
    let parametr = []
    function hideButton() {
        if (parametr.length !== filteredMovies.length) {
            return 'movies-card-list__button movies-card-list__button_visible'
        }
        else return 'movies-card-list__button'
    }

    return (
        <>

            <SearchForm submitHandler={search} />
            <section className="movies-card-list">
                <Preloader isOpen={preloader}></Preloader>
                <div className="movies-card-list__grid">

                    {parametr = filteredMovies.map((el) => {
                        return <MoviesCard onlikeClick={onLikeMovie(el)} movie={el} key={el.id} isSaved={false} isLiked={LikedMovies.find(({ movieId }) => movieId === el.id)} imageSrc={"https://api.nomoreparties.co" + el.image.url} />
                    }).slice(0, moviesCount + (pageCount * newPage))}

                </div>
                <div className='movies-card-list__button-container'>
                    <button onClick={pushTheButtonToLoadMore} className={hideButton()}>Ещё</button>
                    <h2>{errorMessage}</h2>
                </div>
            </section>
        </>
    )


}