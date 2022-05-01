import './portfolio.css'

export const Portfolio = () => {
    return (
        <>
            <section className="portfolio">
                <h2 className="portfolio__title">Портфолио</h2>
                <ul className="portfolio__links">
                    <li className="portfolio__li"><a className='portfolio__link' target='blank' href="https://github.com/IgorPonim/how-to-learn">Статичный сайт<span>↗</span></a></li>
                    <li className="portfolio__li"><a className='portfolio__link' target='blank' href="https://github.com/IgorPonim/russian-travel">Адаптивный сайт<span>↗</span></a></li>
                    <li className="portfolio__li"><a className='portfolio__link' target='blank' href="https://github.com/IgorPonim/react-mesto-api-full">Одностраничное приложение<span>↗</span></a></li>
                </ul>

            </section>
        </>
    )
}