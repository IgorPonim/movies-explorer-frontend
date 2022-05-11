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


export const SavedMovies = () => {
    const history = useHistory()
    const currentUser = useContext(CurrentUserContext)


    // const isOwn = LikedMovies.owner === currentUser._id;



    const { LikedMovies, updateLikedMovies } = useContext(LikedMoviesContext)
    const [searchMessage, setsearchMessage] = useState(null);
    const [checkboxStatus, setcheckboxStatus] = useState(false);

   

    useEffect(()=>{
       let mine = LikedMovies.filter(({ owner }) => owner === currentUser._id)
       
       updateLikedMovies(mine);
    },[history, ])

   
    const onRemoveMovie = (id) => {
        return () => moviesApi.removeMovie(id).then(() => {
            const updateNew = LikedMovies.filter(({ _id }) => _id !== id);
            updateLikedMovies(updateNew);
        });
    };

    const search = ({ searchMessage, checkboxStatus }) => {
        setsearchMessage(searchMessage);
        setcheckboxStatus(checkboxStatus);
    }
    
    const searchRgx = searchMessage ? new RegExp(searchMessage) : null;
    const filteredMovies = LikedMovies
        .filter(({ duration }) => checkboxStatus ? duration < 40 : <empty />)
        .filter(({ nameRU }) => searchRgx ? searchRgx.test(nameRU) : true);




    return (
        <>
            <Header className='header_grey' />
            <SearchForm submitHandler={search} />
            <section className="movies-card-list">
                <div className=" movies-card-list__grid">
                    {filteredMovies
                        .map((el) => (
                            <MoviesCard
                                onlikeClick={onRemoveMovie(el._id)}
                                movie={el} key={el.id}
                                isSaved={true}

                                imageSrc={el.image} />
                        ))}
                </div>
                <div className='movies-card-list__button-container'>
                    <button  className={'movies-card-list__button'}>Ещё</button>
                    <h2></h2>
                </div>

            </section>





            <Footer />
        </>
    )
}