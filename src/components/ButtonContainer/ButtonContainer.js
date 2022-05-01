import './ButtonContainer.css'

export const ButtonContainer = ({ show }) => {


    let className = `movies-card-list__button ${show ? 'movies-card-list__button_visible' : ''}`;
    return (
        <>
            <div className='movies-card-list__button-container `${movies-card-list__button-container_visible}`'>
                <button className={className}>Ещё</button>
            </div>
        </>
    )
}