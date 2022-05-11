import './MoviesCard.css'
import DeleteMovie from '../../images/but1Delete.svg'
import Liked from '../../images/but2Save.svg'
import EmptyLike from '../../images/but3Neitral.svg'

export const MoviesCard = ({ isSaved, isLiked, movie, imageSrc, onlikeClick }) => {

    //перевожу минуты в часы
    function getTimeFromMins(mins) {
        let hours = Math.trunc(mins / 60);
        let minutes = mins % 60;
        return hours + 'ч ' + minutes + 'м';
    };

    const { nameRU, duration, trailerLink } = movie || <></>

    function handlelikeClick (ev) {
        ev.preventDefault();
        onlikeClick()
        
    }


    return (
        <>
            <article className='movie-card'>
                <div className='movie-card__description'>
                    <h2 className='movie-card__name'>{nameRU}</h2>
                    <button onClick={handlelikeClick} className='movie-card__button' >

                        {isSaved
                            ? <img className='movie-card__delete' src={DeleteMovie} alt='удалить' />
                            : <img className='movie-card__like' alt='лайк' src={isLiked ? Liked : EmptyLike} />
                        }

                    </button>

                    <p className='movie-card__duration'>{getTimeFromMins(duration)}</p>
                </div>

                <a rel='noreferrer' href={trailerLink} target='_blank'>
                    <img src={imageSrc} className='movie-card__image' alt='Красивая картиночка' />
                </a>
               
            </article>
        </>
    )
}