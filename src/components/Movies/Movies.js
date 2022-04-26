import { Footer } from "../Footer/Footer"
import { MoviesCard } from "../MoviesCard/MoviesCard"
import { MoviesCardList } from "../MoviesCardList/MoviesCardList"
import { Preloader } from "../Preloader/Preloader"
import { SearchForm } from "../SearchForm/searchForm"

export const Movies = () => {
    return (
        <>
        <SearchForm/>
        <Preloader/>
        <MoviesCardList/>
        <MoviesCard/>
        <Footer/>
        </>
    )
}