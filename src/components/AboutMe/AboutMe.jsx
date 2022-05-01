import './AboutMe.css'
import '..//AboutProject/AboutProject.css'
export const AboutMe = () => {
    return (
        <>
            <section className='about-me'>
                <h2 className="about-project__title">Студент</h2>
                <div className='about-me__grid'>
                    <div className='about-me__description'>
                        <h3 className='about-me__name'>Виталий</h3>
                        <p className='about-me__profession'>Фронтенд-разработчик, 30 лет</p>
                        <p className='about-me__text'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                            и додж. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                        <div className='about-me__links'>
                            <a href='https://www.facebook.com/amymacdonaldmusic' className='about-me__link'>Facebook</a>
                            <a href='https://github.com/IgorPonim/' className='about-me__link'>Github</a>
                        </div>

                    </div>
                    <div className='about-me__photo'></div>
                </div>
            </section>
        </>
    )
}