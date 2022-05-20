import './search-form.css'
import { useEffect, useState } from 'react';
import { useFormWithValidation } from '../FormsWithValidation/FormsWithValidation';


export const SearchForm = ({ submitHandler, errorMes }) => {

    //добавил конструкцию чтобы не было ошибки потом переделаю
    const [checkboxStatus, setCheckboxStatus] = useState(false);

    function checkBoxHandleClick() {
        setCheckboxStatus(!checkboxStatus);
    }

    useEffect(() => {
        const searchResultOfAllMovies = localStorage.getItem('searchParams');
        const searchResultOfSavedMovies = localStorage.getItem('searchMoviesSaved');
        if (searchResultOfAllMovies && window.location.href.indexOf("/movies") > -1) {
            const result = JSON.parse(searchResultOfAllMovies);

            setCheckboxStatus(result.checkboxStatus);
            values.keyword = result.searchMessage
        } else if (searchResultOfSavedMovies && window.location.href.indexOf("/saved-movies") > -1) {
            const result2 = JSON.parse(searchResultOfSavedMovies);

            setCheckboxStatus(result2.checkboxStatus);
            values.keyword = result2.searchMessage
        }
    }, [])



    function sumbitSearch(ev) {
        ev.preventDefault()
        submitHandler({ searchMessage: values.keyword, checkboxStatus })

    }



    const { values, handleChange, errors, isValid, resetForm, setValues } =
        useFormWithValidation();
    errors.validationMessage = 'Нужно ввести ключевое слово'

    return (
        <>
            <form onSubmit={sumbitSearch} className="search-form">
                <fieldset className="search-form__fieldset">
                    <input onChange={handleChange} placeholder="&#128269;    Фильм" required className="search-form__input" type="text" id='new-keyword' name="keyword" value={values.keyword || ""} minLength={1} />
                    <span id='search-error-message' className='validation-error'>{errors.keyword}</span>
                    <button disabled={!isValid} className="search-form__button" type="submit"></button>
                    <div className="search-form__stick" ></div>
                    <div className="search-form__area search-form__fieldset_for_checkbox">
                        <label className="search-form__switch">
                            <input className="search-form__checkbox" type='checkbox' name="checkbox-slider" onChange={checkBoxHandleClick} checked={!checkboxStatus} onClick={checkBoxHandleClick} />

                            <span className="search-form__slider"></span>
                        </label>
                        <p className="search-form__checkbox-message">Короткометражки</p>

                    </div>
                </fieldset>
                <span id='input-search-error' className='input-search__error'>{errorMes}</span>

                <div className='search-form__borderline'></div>

            </form>
        </>
    )
}