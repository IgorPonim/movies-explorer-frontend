import { Switch } from "react-router-dom"
import { Route } from "react-router-dom"
import { Link } from "react-router-dom"
import logo from '../../images/logo.svg'
// import { Sidebar } from "../../Sidebar/Sidebar"
import './Header.css'

export const Header = (props) => {

    let className = `header ${props.className ? props.className : ''}`;

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
                        <div className="header__links">
                            <Link to={'/movies'} className='header__link'>Фильмы</Link>
                            <Link to={'/saved-movies'} className='header__link'>Сохраненные фильмы</Link>
                            <Link to={'/profile'} className='header__account'>Аккаунт</Link>

                        </div>

                        {/* <button className="header__links-touch" onClick={openSidebar} />
                        <Sidebar visible={sidebarVisible} onClose={closeSidebar} /> */}
                    </Route>
                </Switch>
            </header>
        </>
    )
}