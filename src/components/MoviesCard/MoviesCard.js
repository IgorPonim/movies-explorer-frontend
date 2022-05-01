import './MoviesCard.css'


export const MoviesCard = ({ status }) => {
    return (
        <>
            <article className="movie-card">
                <div className="movie-card__description">
                    <h2 className="movie-card__name">33 слова о дизайне</h2>
                    <button className={`movie-card__button ${status ? 'movie-card__button_liked' : ''}`}/>
                        <p className="movie-card__duration">1ч 47м</p>
                </div>
                <img class="movie-card__image" alt="Japan"
                    src={'https://cq-esports.com/storage/uploads/cosplay-characters/1209685/1.jpg'} />
            </article>
        </>
    )
}