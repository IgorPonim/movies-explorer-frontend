import { Footer } from "../Footer/Footer"
import { Header } from "../Header/Header"
import { MoviesCard } from "../MoviesCard/MoviesCard"
import { MoviesCardList } from "../MoviesCardList/MoviesCardList"
import { Preloader } from "../Preloader/Preloader"
import { SearchForm } from "../SearchForm/searchForm"
import '../Header/Header.css'
import { ButtonContainer } from "../ButtonContainer/ButtonContainer"


export const Movies = () => {
    return (
        <>
            <Header className='header_grey' />
            <SearchForm />
            <Preloader isOpen={false} />
            <MoviesCardList />
            <ButtonContainer show={true} />
            <Footer />
        </>
    )
}