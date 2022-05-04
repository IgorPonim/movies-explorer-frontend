import './NavTab.css'

export const NavTab = () => {
    return (
        <>
            <section className="navtab">
                <nav className="navtab__menu">
                    <a href="#1" className="navtab__link">О проекте</a>
                    <a href="#2" className="navtab__link">Технологии</a>
                    <a href="#3" className="navtab__link">Студент</a>
                </nav>
            </section>
        </>
    )
}