import React from 'react';

export const Header = (props) => {
    let locationData;

    if (props.location.weather) {
        locationData = props.location.weather.location;
    }

    return <header className="header">
        <h2 className="header__title">{ (locationData) ? locationData.name : ""}</h2>
        <p className="header__text">{ (locationData) ? `(${locationData.country})` : ""}</p>
        <p className="header__subtitle">{ (!locationData) ? "Актуальный прогноз погоды" : ""} </p>
    </header>
}

