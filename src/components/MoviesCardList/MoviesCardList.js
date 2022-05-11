import './MoviesCardList.css'
import { MoviesCard } from '../MoviesCard/MoviesCard'
import { useCallback, useContext, useEffect, useState } from 'react'
import { moviesApi } from '../../utils/MoviesApi'
import '../ButtonContainer/ButtonContainer.css'
import { SearchForm } from '../SearchForm/searchForm'
import { LikedMoviesContext } from '../../contexts/LikedMoviesContext'
import { MoviesContext } from '../../contexts/MoviesContext'

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
        if (hideButton.length !== filteredMovies.length) { return 'movies-card-list__button movies-card-list__button_visible' }
        return 'movies-card-list__button '
    }


    const [errorMessage, setErrorMEsage] = useState('')
    const [filteredMovies, setFilteredMovies] = useState([])
    const [validateError, setvalidateError] = useState('')

    // короче сконструлил такую функцию дл поиска, я человек неопытный делаю как умею )))
    function search({ searchMessage, checkboxStatus }) {

        const regex = new RegExp(searchMessage)

        const loadedMovies = JSON.parse(localStorage.getItem('movies'));
        let res = []
        res = loadedMovies
            .filter(({ nameRU }) => regex.test(nameRU))
            .filter(({ duration }) => checkboxStatus ? duration < 40 : <empty />)


        setFilteredMovies(res)
        if (res.length === 0) { setErrorMEsage('Ничего не найдено 😢') }

    }

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
                console.log(isLikedMovie)
                moviesApi.createMovie(data).then((res) => {
                    updateLikedMovies([...LikedMovies, res]);

                })
            }
        }
    }, [LikedMovies, updateLikedMovies])

    // function handleMovieSave(movie) {
    //     const movieId = movie.id;
    //     const {
    //       country,
    //       director,
    //       duration,
    //       year,
    //       description,
    //       nameRU,
    //       nameEN,
    //       image,
    //       trailer,
    //       thumbnail,
    //     } = movie;

    //     moviesApi
    //     .createMovie({
    //         movieId,
    //         image,
    //         thumbnail,
    //         trailer,
    //         country,
    //         director,
    //         duration,
    //         year,
    //         description,
    //         nameRU,
    //         nameEN,
    //       })
    //       .then((data) => setMovies([...movies, data]))
    //       .catch((err) =>
    //         console.log(err)
    //       );
    //   }


    return (
        <>
            <SearchForm errorMes={validateError} submitHandler={search} />
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