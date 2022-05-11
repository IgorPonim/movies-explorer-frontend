import { Header } from "../Header/Header"
import { Link } from "react-router-dom"
import './Profile.css'
import { useContext, useEffect, useState } from "react"
import { CurrentUserContext } from "../../contexts/CurrentUserContext"
import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const Profile = ({ changeInfo, handleLogOut }) => {

    const currentUser = useContext(CurrentUserContext)
    const history = useHistory()

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')



    function handleChange(ev) {
        if (ev.target.name === 'profile-email') {
            setEmail(ev.target.value)
        }
        else if (ev.target.name === 'profile-name') {
            setName(ev.target.value)
        }
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        changeInfo(email, name)
    }

    useEffect(() => {
        setEmail(currentUser.email)
        setName((currentUser.name))
    }, [currentUser, history])


    return (
        <>
            <Header className={'header_grey'} />
            <section className="profile">
                <div className="profile__form">
                    <h1 className="profile__title">Привет, {name || null}!</h1>

                    <form onSubmit={handleSubmit} className="profile__input_container">
                        <div className="profile__input_area">
                            <label className="profile__label">Имя</label>
                            <input value={name || ""} onChange={handleChange} className="profile__input" id="name" name="profile-name" type="text" />
                        </div>
                        <div className="profile__line"></div>
                        <div className="profile__input_area">
                            <label className="profile__label">E-mail</label>
                            <input value={email || ""} onChange={handleChange} className="profile__input" id="email" name="profile-email" type="email" />
                        </div>
                        <button onClick={handleSubmit} className="profile__button">Редактировать</button>
                    </form >

                    <div className="profile__button-container">

                        <button onClick={handleLogOut} className="profile__button profile__button_red">Выйти из аккаунта</button>
                    </div>
                </div>
            </section>
        </>
    )
}