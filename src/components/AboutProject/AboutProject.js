import './AboutProject.css'

export const AboutProject = () => {
    return (
        <>
            <section className="about-project">
                <h2 className="about-project__title"> О проекте</h2>
                <div className="about-project__container">
                    <div className="about-project__block">
                        <h2 className="about-project__subtitle">Дипломный проект включал 5 этапов</h2>
                        <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </div>
                    <div className="about-project__block">
                        <h2 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h2>
                        <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </div>
                </div>
                <div className='about-project__longrid'>
                    <div className='about-project__backend'>1 неделя</div>
                    <div className='about-project__frontend'>4 недели</div>
                    <div className='about-project__backend'>Back-end</div>
                    <div className='about-project__frontend'>Front-end</div>
                </div>
            </section>
        </>
    )
}