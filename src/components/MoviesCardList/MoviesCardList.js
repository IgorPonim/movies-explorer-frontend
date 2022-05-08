import './MoviesCardList.css'
import { MoviesCard } from '../MoviesCard/MoviesCard'
import { useEffect, useState } from 'react'
import { moviesApi } from '../../utils/MoviesApi'
import '../ButtonContainer/ButtonContainer.css'
import { SearchForm } from '../SearchForm/searchForm'
export const MoviesCardList = () => {

    //вначале загружу массив карточек
    const [movies, setMovies] = useState([])

    useEffect(() => {
        Promise.all([
            moviesApi.getInitialMovies()
        ])
            .then(([cards]) => {
                cards.sort(() => 0.5 - Math.random())
                setMovies(cards)
            })

            .catch((err) => {
                console.log(err);
            })
    }, []);

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


// короче сконструлил такую функцию дл поиска, я человек неопытный делаю как умею )))
    function search({ searchMessage, checkboxStatus }) {

        const regex = new RegExp(searchMessage)
        let res = []
        res = movies
            .filter(({ nameRU }) => regex.test(nameRU))
            .filter(({ duration }) => checkboxStatus ? duration < 40 : <empty />)

        setFilteredMovies(res)
        if (res.length === 0) { setErrorMEsage('Ничего не найдено 😢') }
    }


    return (
        <>
            <SearchForm submitHandler={search} />
            <section className="movies-card-list">
                <div className="movies-card-list__grid">

                    {hideButton = filteredMovies.map((el) => {
                        return <MoviesCard movie={el} key={el.id} isSaved={false} isLiked={false} imageUrl={"https://api.nomoreparties.co" + el.image.url} />
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