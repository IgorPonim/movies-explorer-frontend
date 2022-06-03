import NO from '../../images/NO.png'
import YES from '../../images/YES.png'
import './InfoToolTip.css'

const InfoToolTip = ({ isOpen, onClose, status }) => {

    return (
        <div className={`InfoTool  ${isOpen ? 'InfoTool_open' : ''}`}>
            <div className='InfoTool__content'  >
                <button type='button' onClick={onClose} className='InfoTool__close'></button>

                {status === true && (
                    <>
                        <img className='InfoToolTip__img' alt="Все получилось" src={YES} />
                    </>)}

                {status === false && (
                    <>
                        <img className='InfoToolTip__img' alt="Неполучилось" src={NO} />
                    </>)}

            </div>
        </div>
    )

}




export default InfoToolTip