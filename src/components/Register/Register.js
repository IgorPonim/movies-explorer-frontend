import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom/"
import { Header } from "../Header/Header"
import '../Header/Header.css'
import './Register.css'

export const Register = () => {



    return (
        <>
            <section className="register">
                <div className="register__container">
                    <Link to='/'>
                        <img class="header_logo header_logo_register-position" src="/static/media/logo.6427ffc3dd1ac70c1e165d30d5f6bc3c.svg" alt="лого" />
                    </Link>
                    <h2 className="register__title">Добро пожаловать!</h2>

                    <label className="register__label">Имя</label>
                    <input className="register__input" id="register-name" name="register-name" type="text" placeholder="Имя" value="Виталий" />

                    <label className="register__label">E-mail</label>
                    <input className="register__input" id="register-email" name="register-email" type="email" placeholder="email" value="pochta@yandex.ru" />

                    <label className="register__label">Пароль</label>
                    <input className="register__input" id="register-pass" name="register-pass" type="text" placeholder="пароль" value="***********" />

                    <button class="register__button" type="submit">Зарегистрироваться</button>


                    <div className="register__link-container">
                        <p className="register__link-text">Уже зарегистрированы?</p>
                        <Link to="/signin" className="register__link">Войти</Link>
                    </div> </div>
            </section>
        </>
    )
}