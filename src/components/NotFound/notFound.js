import './NotFound.css'
import { useHistory } from "react-router-dom"


export const NotFound = () => {

    const history = useHistory()
    function handleClick() {
        history.goBack()
    }

    return (
        <>
            <section className='not-found'>
                <div className='not-found__container'>
                    <h1 className='not-found__title'>404</h1>
                    <p className='not-found__text'>Страница не найдена</p>
                    <button className='not-found__button' onClick={handleClick}>Назад</button>
                </div>

            </section>
        </>
    )
}