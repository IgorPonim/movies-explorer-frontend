import { useState } from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom/"
import { useFormWithValidation } from "../FormsWithValidation/FormsWithValidation"
import { Header } from "../Header/Header"
import '../Header/Header.css'
import './Register.css'
import logo from '../../images/logo.svg'

export const Register = ({onRegister}) => {

    // const [email, setEmail] = useState('')
    // const [password, setpassword] = useState('')
    // const [name, setName] = useState('')

    // function handleChange(ev) {
    //     if (ev.target.name === 'register-email') {
    //         setEmail(ev.target.value)
    //     }
    //     if (ev.target.name === 'register-pass') {
    //         setpassword(ev.target.value)
    //     }
    //     else if (ev.target.name === 'register-name') 
    //         setName(ev.target.value)
        
    // }

    function handleSubmit(ev) {
        ev.preventDefault()
        onRegister(values)
       
    }


    const { values, handleChange, errors, isValid, resetForm } =
        useFormWithValidation();

  

    return (
        <>
            <section className="register">
                <form onSubmit={handleSubmit} className="register__container">
                    <Link to='/'>
                        <img className="header_logo header_logo_register-position" src={logo} alt="лого" />
                    </Link>
                    <h2 className="register__title">Добро пожаловать!</h2>

                    <label className="register__label">Имя</label>
                    <input onChange={handleChange} className="register__input" minLength={3} maxLength={30} value={values.name || ''} id="register-name" name="name" type="text" placeholder="Имя"  required/>
                    <span className='validation-error'>{errors.name}</span>

                    <label className="register__label">E-mail</label>
                    <input onChange={handleChange} className="register__input"  minLength={2} maxLength={30} value={values.email || ''} id="register-email" name="email" type="email" placeholder="email" required/>
                    <span className='validation-error'>{errors.email}</span>

                    <label className="register__label">Пароль</label>
                    <input  onChange={handleChange} className="register__input"  minLength={3} maxLength={30} value={values.password || ''} id="register-pass" name="password" type="password" placeholder="пароль" required/>
                    <span className='validation-error'>{errors.password}</span>


                    <button className={` login__button  ${isValid ? 'login__button_blue ' : ''} `} disabled={!isValid} type='submit'>Зарегистрироваться</button>


                    <div className="register__link-container">
                        <p className="register__link-text">Уже зарегистрированы?</p>
                        <Link to="/signin" className="register__link">Войти</Link>
                    </div> </form>
            </section>
        </>
    )
}