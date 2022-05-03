import { useState } from "react"
import { Switch } from "react-router-dom"
import { Route } from "react-router-dom"
import { Link } from "react-router-dom"
import logo from '../../images/logo.svg'
// import { Sidebar } from "../../Sidebar/Sidebar"
import './Header.css'

export const Header = (props) => {

    let className = `header ${props.className ? props.className : ''}`;

    const [popupOpen, setpopupOpen] = useState(false)

    function handleClickBurger() {
        setpopupOpen(true)
    }
    function handleClickonCloseButton() {
        setpopupOpen(false)
    }


    return (
        <>

            <header className={className}>
                <Switch>
                    <Route exact path={'/'}>
                        <Link to='/' ><img className="header_logo" src={logo} alt="лого"></img></Link>
                        <div className="header__links">
                            <Link to={'/signup'} className='header__link'>Регистрация</Link>
                            <Link to={'/signin'} className='header__button'>Войти</Link>
                        </div>
                    </Route>
                    <Route path='*'>
                        <Link to='/' ><img className="header_logo" src={logo} alt="лого"></img></Link>

                        <div className={`popup ${popupOpen ? 'popup_visible' : ''}`}>

                            <Link to='/'  ><p  className="popup__nav">Главная</p></Link>
                            <Link to={'/movies'} ><p  className="popup__nav">Фильмы</p></Link>
                            <Link to={'/saved-movies'}><p  className="popup__nav">Сохраненные фильмы</p></Link>
                            <Link to={'/profile'} className='popup__accaunt '>Аккаунт</Link>
                            <button className="popup__close" onClick={handleClickonCloseButton} />
                        </div>

                        <div className="header__links">
                            <Link to={'/movies'} className='header__nav'>Фильмы</Link>
                            <Link to={'/saved-movies'} className='header__nav'>Сохраненные фильмы</Link>
                            <Link to={'/profile'} className='header__account'>Аккаунт</Link>

                            <button onClick={handleClickBurger} className="header__burder" />

                        </div>

                        {/* <button className="header__links-touch" onClick={openSidebar} />
                        <Sidebar visible={sidebarVisible} onClose={closeSidebar} /> */}
                    </Route>
                </Switch>
            </header>
        </>
    )
}