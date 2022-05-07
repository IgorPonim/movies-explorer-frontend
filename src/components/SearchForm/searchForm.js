import './search-form.css'
import { useState } from 'react';


export const SearchForm = ({ submitHandler }) => {

    //добавил конструкцию чтобы не было ошибки потом переделаю
    const [checkboxStatus, setCheckboxStatus] = useState(false);

    function checkBoxHandleClick() {
        setCheckboxStatus(!checkboxStatus);
    }


    const [searchMessage, setSearchMessage] = useState('')

    function onChange(ev) {
        setSearchMessage(ev.target.value)
    }

    function sumbitSearch(ev) {
        ev.preventDefault()
        submitHandler({ searchMessage, checkboxStatus })
    }

    return (
        <>
            <form onSubmit={sumbitSearch} className="search-form">
                <fieldset className="search-form__fieldset">
                    <input onChange={onChange} placeholder="&#128269;    Фильм" className="search-form__input" type="text" name="keyword" required="" />
                    <button className="search-form__button" type="submit"></button>
                    <div className="search-form__stick" ></div>
                    <div className="search-form__area search-form__fieldset_for_checkbox">
                        <label className="search-form__switch">
                            <input className="search-form__checkbox" type='checkbox' name="checkbox-slider"  checked={!checkboxStatus} onClick={checkBoxHandleClick} />
                            <span className="search-form__slider"></span>
                        </label>
                        <p className="search-form__checkbox-message">Короткометражки</p>
                    </div>
                </fieldset>

                <div className='search-form__borderline'></div>

            </form>
        </>
    )
}