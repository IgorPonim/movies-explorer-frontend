import { Header } from "../Header/Header"
import { Link } from "react-router-dom"
import './Profile.css'

export const Profile = () => {
    return (
        <>
            <Header className={'header_grey'} />
            <section className="profile">
                <form className="profile__form">
                    <h1 className="profile__title">Привет, Виталий!</h1>

                    <form className="profile__input_container">
                        <div className="profile__input_area">
                            <label className="profile__label">Имя</label>
                            <input className="profile__input" id="name" name="name" type="text" placeholder="Имя" value="Виталий" />
                        </div>
                        <div className="profile__line"></div>
                        <div className="profile__input_area">
                            <label className="profile__label">E-mail</label>
                            <input className="profile__input" id="email" name="email" type="email" placeholder="email" value="pochta@yandex.ru" />
                        </div>
                    </form>

                    <div className="profile__button-container">
                        <button className="profile__button">Редактировать</button>
                        <Link to="/" className="profile__button profile__button_red">Выйти из аккаунта</Link>
                    </div>
                </form>
            </section>
        </>
    )
}