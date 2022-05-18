import { Footer } from "../Footer/Footer"
import { Header } from "../Header/Header"
import { MoviesCard } from "../MoviesCard/MoviesCard"
import { MoviesCardList } from "../MoviesCardList/MoviesCardList"
import { SearchForm } from "../SearchForm/searchForm"
import '../Header/Header.css'
import { ButtonContainer } from "../ButtonContainer/ButtonContainer"
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { LikedMoviesContext } from "../../contexts/LikedMoviesContext"
import { moviesApi } from "../../utils/MoviesApi"
import { CurrentUserContext } from "../../contexts/CurrentUserContext"
import { useHistory } from "react-router-dom"
import { Preloader } from "../Preloader/Preloader"


export const SavedMovies = () => {
    const history = useHistory()
    const currentUser = useContext(CurrentUserContext)


    const [searchMessage, setsearchMessage] = useState(null);
    const [checkboxStatus, setcheckboxStatus] = useState(false);

    //короче загружаю с сервера карточки и фильтрую чтобы остались только мои, либо загружаю с локалстораджа
    const [filteredMovies, setFilteredMovies] = useState([])
    useEffect(() => {
        let id = currentUser._id.toString()
        const filter = localStorage.getItem('resultiSavedlmovies')
        if (filter) { setFilteredMovies(JSON.parse(filter)) }

        else {
            setFilteredMovies(LikedMovies)
            moviesApi.getSavedMovies()
                .then((data) => {

                    let res = []
                    res = data.filter(function ({ owner }) {
                        return owner.includes(id)
                    });
                    updateLikedMovies(res)
                })
                .catch((err) => {
                    console.log(err)
                })
                .finally(() => {
                })
        }
        if (filteredMovies === LikedMovies) {
            setFilteredMovies(LikedMovies)
        }
    }, [])


    const { LikedMovies, updateLikedMovies } = useContext(LikedMoviesContext)


    //удаляем и обновляем контекст
    const onRemoveMovie = (id) => {
        return () => moviesApi.removeMovie(id).then(() => {
            const updateNew = LikedMovies.filter(({ _id }) => _id !== id);
            updateLikedMovies(updateNew);
            setFilteredMovies(updateNew)
        });
    };
    //функция поиска с красивым прелоадером, так как картинки загружены
    const search = ({ searchMessage, checkboxStatus }) => {

        setPreloader(true)

        setTimeout(() => {
            setPreloader(false)
            setsearchMessage(searchMessage);
            setcheckboxStatus(checkboxStatus);
        }, 600);

        localStorage.setItem('searchMoviesSaved', JSON.stringify({ searchMessage, checkboxStatus }));

        const searchRgx = searchMessage ? new RegExp(searchMessage) : null;

        let filteredMovies = LikedMovies
            .filter(({ duration }) => checkboxStatus ? duration < 40 : true)
            .filter(({ nameRU }) => searchRgx ? searchRgx.test(nameRU) : true);
        setFilteredMovies(filteredMovies)
        localStorage.setItem('resultiSavedlmovies', JSON.stringify(filteredMovies));
    }


    const [preloader, setPreloader] = useState(false)

    return (
        <>
            <Header className='header_grey' />
            <SearchForm submitHandler={search} />
            <section className="movies-card-list">

                <Preloader isOpen={preloader}></Preloader>
                <div className=" movies-card-list__grid">
                    {!preloader && filteredMovies
                        .map((el) => (
                            <MoviesCard
                                onlikeClick={onRemoveMovie(el._id)}
                                movie={el}
                                key={el._id}
                                isSaved={true}

                                imageSrc={el.image} />
                        ))}
                </div>
                <div className='movies-card-list__button-container'>
                    <button className={'movies-card-list__button'}>Ещё</button>
                    {filteredMovies.length === 0 && <h2>Ничего не найдено 😢</h2>}
                </div>

            </section>
            <Footer />
        </>
    )
}