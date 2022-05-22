import { Header } from "../Header/Header"
import { Link } from "react-router-dom"
import './Profile.css'
import { useContext, useEffect, useState } from "react"
import { CurrentUserContext } from "../../contexts/CurrentUserContext"
import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useFormWithValidation } from "../FormsWithValidation/FormsWithValidation"

export const Profile = ({ changeInfo, handleLogOut }) => {

    const currentUser = useContext(CurrentUserContext)
    const history = useHistory()

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')



    // function handleChange(ev) {
    //     if (ev.target.name === 'profile-email') {
    //         setEmail(ev.target.value)
    //     }
    //     else if (ev.target.name === 'profile-name') {
    //         setName(ev.target.value)
    //     }
    // }


    function handleSubmit(ev) {

        ev.preventDefault()
        changeInfo(values)
    }




    const { values, handleChange, errors, isValid, resetForm, setIsValid } =
        useFormWithValidation();

    useEffect(() => {
        currentUser && resetForm({
            name: currentUser.name,
            email: currentUser.email
        });

    }, [currentUser, resetForm])

    useEffect(() => {
        if (values.name === currentUser.name && values.email === currentUser.email) { setIsValid(false) }

        setEmail(currentUser.email)
        setName((currentUser.name))

    }, [currentUser, history, values])

    return (
        <>
            <Header className={'header_grey'} />
            <section className="profile">
                <div className="profile__form">
                    <h1 className="profile__title">Привет, {name || null}!</h1>

                    <form onSubmit={handleSubmit} className="profile__input_container">
                        <div className="profile__input_area">

                            <label className="profile__label">Имя</label>
                            <input onChange={handleChange} className="profile__input" minLength={3} maxLength={30} value={values.name || ""} id="name" name="name" type="text" required />

                        </div>
                        <span className='validation-error'>{errors.name}</span>


                        <div className="profile__line"></div>
                        <div className="profile__input_area">

                            <label className="profile__label">E-mail</label>
                            <input onChange={handleChange} className="profile__input" minLength={2} maxLength={30} value={values.email || ""} id="email" name="email" type="email"
                                pattern="^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$" required />
                        </div>

                        <span className='validation-error'>{errors.email}</span>

                        <button onClick={handleSubmit} disabled={!isValid} className={isValid ? 'profile__button' : 'profile__button profile__button_dark'}>Редактировать</button>
                    </form >

                    <div className="profile__button-container">

                        <button onClick={handleLogOut} className="profile__button profile__button_red">Выйти из аккаунта</button>
                    </div>
                </div>
            </section>
        </>
    )
}