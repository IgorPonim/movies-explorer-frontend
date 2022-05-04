import './MoviesCardList.css'
import { MoviesCard } from '../MoviesCard/MoviesCard'
export const MoviesCardList = () => {
    return (
        <>
            <section className="movies-card-list">
                <div className="movies-card-list__grid">
                    <MoviesCard />
                    <MoviesCard />
                    <MoviesCard status={true} /><MoviesCard />
                    <MoviesCard />
                    <MoviesCard status={true} /> 
                    <MoviesCard /> 
                     <MoviesCard status={true} />
                     <MoviesCard />
                     <MoviesCard status={true} />
                    <MoviesCard />
                    <MoviesCard />

                </div>

            </section>
        </>
    )
}