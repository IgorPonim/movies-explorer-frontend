import { useState } from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom/"
import { Header } from "../Header/Header"
import '../Header/Header.css'
import './Register.css'

export const Register = ({onRegister}) => {

    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [name, setName] = useState('')

    function handleChange(ev) {
        if (ev.target.name === 'register-email') {
            setEmail(ev.target.value)
        }
        if (ev.target.name === 'register-pass') {
            setpassword(ev.target.value)
        }
        else if (ev.target.name === 'register-name') 
            setName(ev.target.value)
        
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onRegister(email, password, name)
       
    }



    return (
        <>
            <section className="register">
                <form onSubmit={handleSubmit} className="register__container">
                    <Link to='/'>
                        <img className="header_logo header_logo_register-position" src="/static/media/logo.6427ffc3dd1ac70c1e165d30d5f6bc3c.svg" alt="лого" />
                    </Link>
                    <h2 className="register__title">Добро пожаловать!</h2>

                    <label className="register__label">Имя</label>
                    <input onChange={handleChange} className="register__input" id="register-name" name="register-name" type="text" placeholder="Имя" />

                    <label className="register__label">E-mail</label>
                    <input onChange={handleChange} className="register__input" id="register-email" name="register-email" type="email" placeholder="email" />

                    <label className="register__label">Пароль</label>
                    <input  onChange={handleChange} className="register__input" id="register-pass" name="register-pass" type="text" placeholder="пароль" />

                    <button  className="register__button" type="submit">Зарегистрироваться</button>


                    <div className="register__link-container">
                        <p className="register__link-text">Уже зарегистрированы?</p>
                        <Link to="/signin" className="register__link">Войти</Link>
                    </div> </form>
            </section>
        </>
    )
}