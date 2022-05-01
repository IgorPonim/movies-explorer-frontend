import '..//AboutProject/AboutProject.css'
import '..//Promo/Promo.css'
import './Techs.css'
export const Techs = () => {
    return (
        <>
            <section className="techs">
            <h2 className="about-project__title">Технологии</h2>
            <div className='techs__container'>
                <h2 className='techs__title'>7 технологий</h2>
                <h3 className='techs__subtitle'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</h3>
                <ul className='techs__grid'>
                    <li className='techs__skill'>HTML</li>
                    <li className='techs__skill'>CSS</li>
                    <li className='techs__skill'>JS</li>
                    <li className='techs__skill'>React</li>
                    <li className='techs__skill'>Git</li>
                    <li className='techs__skill'>Express.js</li>
                    <li className='techs__skill'>MongoDB</li>
                    </ul>
                </div>
            </section>

        </>
    )
}