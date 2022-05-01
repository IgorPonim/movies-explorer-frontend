import { AboutMe } from "../AboutMe/AboutMe"
import { AboutProject } from "../AboutProject/AboutProject"
import { Footer } from "../Footer/Footer"
import { Header } from "../Header/Header"
import { NavTab } from "../NavTab/NavTab"
import { Portfolio } from "../Portfolio/Portfolio"
import { Promo } from "../Promo/Promo"
import { Techs } from "../Techs/Techs"
import './Main.css'

export const Main = () => {
    return (
        <main className="main">
            <Header />
            <Promo />
            <NavTab />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
            <Footer />
        </main>
    )
}