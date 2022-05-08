import { useState } from "react"
import { Link } from "react-router-dom"
import { Header } from "../Header/Header"
import '../Register/Register.css'
import './Login.css'


export const Login = ({ loggedIn }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    function handleChange(ev) {
        if (ev.target.name === 'login-email') {
            setEmail(ev.target.value)
        }
        else if (ev.target.name === 'login-pass') {
            setPassword(ev.target.value)
        }
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        loggedIn(email, password)
    }

    return (
        <>
            <section className="login">
                <form onSubmit={handleSubmit} className="register__container">
                    <Link to='/'>
                        <img className="header_logo header_logo_register-position" src="/static/media/logo.6427ffc3dd1ac70c1e165d30d5f6bc3c.svg" alt="лого" />
                    </Link>
                    <h2 className="register__title">Рады видеть!</h2>


                    <label className="register__label">E-mail</label>
                    <input onChange={handleChange} className="register__input" id="login-email" name="login-email" type="email" placeholder="email" />

                    <label className="register__label">Пароль</label>
                    <input onChange={handleChange} className="register__input" id="login-pass" name="login-pass" type="text" placeholder="пароль" />

                    <button  className="login__button" type="submit">Войти</button>


                    <div className="register__link-container">
                        <p className="register__link-text">Еще не зарегистрированы?</p>
                        <Link to="/signup" className="register__link">Регистрация</Link>
                    </div> </form>

            </section>
        </>
    )
}