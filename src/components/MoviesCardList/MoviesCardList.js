import './MoviesCardList.css'
import { MoviesCard } from '../MoviesCard/MoviesCard'
import { useCallback, useContext, useEffect, useState } from 'react'
import { moviesApi } from '../../utils/MoviesApi'
import '../ButtonContainer/ButtonContainer.css'
import { SearchForm } from '../SearchForm/searchForm'
import { LikedMoviesContext } from '../../contexts/LikedMoviesContext'


export const MoviesCardList = () => {

    const [movies, setMovies] = useState([])

    //повешу слушатель на размер окошка
    const [size, setSize] = useState(0)

    function resize() {
        setSize(document.body.offsetWidth)
    }

    window.addEventListener('resize', () => {
        setTimeout(() => {
            resize()
        }, 300)
    });

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

    //чтобы спрятать кнопку придумал такое
    let hideButton = []
    function classNamed() {
        if (hideButton.length !== filteredMovies.length) {
            return 'movies-card-list__button movies-card-list__button_visible'
        }
        return 'movies-card-list__button '
    }


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

    //функция поиска сделал так сначала
    function search({ searchMessage, checkboxStatus }) {
        setErrorMEsage('')
        const regex = new RegExp(searchMessage)
        let res = []
        res = movies
            .filter(({ nameRU }) => regex.test(nameRU))
            .filter(({ duration }) => checkboxStatus ? duration < 40 : true)

        setFilteredMovies(res)
        if (res.length === 0) { setErrorMEsage('Ничего не найдено 😢') }
    }



//переножу контекст лайкнутых
    const { LikedMovies, updateLikedMovies } = useContext(LikedMoviesContext)

    //лайкаем или удаляем 
    const onLikeMovie = useCallback((data) => {
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
    }, [LikedMovies, updateLikedMovies])


    return (
        <>

            <SearchForm submitHandler={search} />
            <section className="movies-card-list">
                <div className="movies-card-list__grid">

                    {hideButton = filteredMovies.map((el) => {
                        return <MoviesCard onlikeClick={onLikeMovie(el)} movie={el} key={el.id} isSaved={false} isLiked={LikedMovies.find(({ movieId }) => movieId === el.id)} imageSrc={"https://api.nomoreparties.co" + el.image.url} />
                    }).slice(0, moviesCount + (pageCount * newPage))}

                </div>
                <div className='movies-card-list__button-container'>
                    <button onClick={pushTheButtonToLoadMore} className={classNamed()}>Ещё</button>
                    <h2>{errorMessage}</h2>
                </div>
            </section>
        </>
    )


}