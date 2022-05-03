import './search-form.css'
import { useState } from 'react';


export const SearchForm = () => {

    const [checkboxActivate, setCheckboxActivate] = useState(true);

    function onCheckboxClick() {
        setCheckboxActivate(!checkboxActivate);
    }


    return (
        <>
            <form className="search-form">
                <fieldset class="search-form__fieldset">
                    <input placeholder="&#128269;    Фильм" className="search-form__input" type="text" name="keyword" required=""  />
                    <button class="search-form__button" type="submit"></button>
                    <div class="search-form__stick" ></div>
                    <div class="search-form__fieldset2 sign-form__fieldset_for_checkbox">
                        <label class="search-form__switch">
                            <input class="search-form__checkbox" type="checkbox" name="checkbox-slider" onClick={onCheckboxClick} checked={setCheckboxActivate} />
                            <span class="search-form__slider"></span>
                        </label>
                        <p class="search-form__checkbox-message">Короткометражки</p>

                    </div>
                </fieldset>
            </form>
        </>
    )
}