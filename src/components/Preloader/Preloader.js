import React, { useState } from 'react'
import './Preloader.css'

export const Preloader = ({ isOpen }) => {


    return (
        <div className={`preloader ${isOpen ? 'preloader_open' : ''}`}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};


