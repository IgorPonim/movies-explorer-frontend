import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormWithValidation } from '../FormsWithValidation/FormsWithValidation'
import { Header } from '../Header/Header'
import '../Register/Register.css'
import './Login.css'
import logo from '../../images/logo.svg'

export const Login = ({ loggedIn }) => {

    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')

    // function handleChange(ev) {
    //     if (ev.target.name === 'login-email') {
    //         setEmail(ev.target.value)
    //     }
    //     else if (ev.target.name === 'login-pass') {
    //         setPassword(ev.target.value)
    //     }
    // }



    function handleSubmit(ev) {
        ev.preventDefault()
        loggedIn(values)
    }

    const { values, handleChange, errors, isValid, resetForm } =
        useFormWithValidation();



    return (
        <>
            <section className='login'>
                <form onSubmit={handleSubmit} className='register__container'>
                    <Link to='/'>
                        <img className='header_logo header_logo_register-position' src={logo} alt='лого' />
                    </Link>
                    <h2 className='register__title'>Рады видеть!</h2>


                    <label className='register__label'>E-mail</label>
                    <input onChange={handleChange} className='register__input' minLength={2} maxLength={30} value={values.email || ''} id='login-email' name='email' type='email' placeholder='email' required />
                    <span className='validation-error'>{errors.email}</span>
                    <label className='register__label'>Пароль</label>

                    <input onChange={handleChange} className='register__input' minLength={3} maxLength={30} value={values.password || ''} id='login-pass' name='password' type='text' placeholder='пароль' required />
                    <span className='validation-error'>{errors.password}</span>
                    <button className={` login__button  ${isValid ? 'login__button_blue ' : ''} `} disabled={!isValid} type='submit'>Войти</button>


                    <div className='register__link-container'>
                        <p className='register__link-text'>Еще не зарегистрированы?</p>
                        <Link to='/signup' className='register__link'>Регистрация</Link>
                    </div> </form>

            </section>
        </>
    )
}