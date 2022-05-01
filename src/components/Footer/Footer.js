import './Footer.css'

export const Footer = () => {
    return (
        <>
            <section className='footer'>
                <p className='footer__description'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
                <div className='footer__copyright'>
                    <div className='footer__year'>&copy; {new Date().getFullYear()}</div>
                    <div className='footer__links'>
                        <a target='blanck' href='https://practicum.yandex.ru/' className='footer__link'>Яндекс.Практикум</a>
                        <a target='blanck' href='https://github.com' className='footer__link'>Github</a>
                        <a target='blanck' href='https://www.facebook.com/' className='footer__link'>Facebook</a>
                    </div>
                </div>
            </section>
        </>
    )
}