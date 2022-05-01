import { Link } from "react-router-dom"
import { Header } from "../Header/Header"
import '../Register/Register.css'
import './Login.css'


export const Login = () => {
    return (
        <>
            <section className="login">
                <div className="register__container">
                    <Link to='/'>
                        <img class="header_logo" src="/static/media/logo.6427ffc3dd1ac70c1e165d30d5f6bc3c.svg" alt="лого" />
                    </Link>
                    <h2 className="register__title">Рады видеть!</h2>


                    <label className="register__label">E-mail</label>
                    <input className="register__input" id="login-email" name="login-email" type="email" placeholder="email" value="pochta@yandex.ru" />

                    <label className="register__label">Пароль</label>
                    <input className="register__input" id="login-pass" name="login-pass" type="text" placeholder="пароль" value="***********" />

                    <button class="register__button" type="submit">Войти</button>


                    <div className="register__link-container">
                        <p className="register__link-text">Еще не зарегистрированы?</p>
                        <Link to="/signup" className="register__link">Регистрация</Link>
                    </div> </div>

            </section>
        </>
    )
}