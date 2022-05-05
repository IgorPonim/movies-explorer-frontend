import { Footer } from "../Footer/Footer"
import { Header } from "../Header/Header"
import { MoviesCard } from "../MoviesCard/MoviesCard"
import { MoviesCardList } from "../MoviesCardList/MoviesCardList"
import { SearchForm } from "../SearchForm/searchForm"
import '../Header/Header.css'
import { ButtonContainer } from "../ButtonContainer/ButtonContainer"

export const SavedMovies = () => {
    return (
        <>
            <Header className='header_grey' />
            <SearchForm />
            <MoviesCardList />
            <ButtonContainer show={false} />
            <Footer />
        </>
    )
}