import React from 'react';
import {store} from "../../store/reducers/weatherReducer";

const parseForecastData = (data, count = 1) => {
    let inData = [],
        outData = {
            date: '',
            maxtemp_c: '',
            mintemp_c: '',
            text: '',
            icon: '',
            maxwind_kph: ''
        };

    if (!data.weather) return false;

    inData = data.weather.forecast.forecastday;

    outData.date = inData[count].date;
    outData.maxtemp_c = inData[count].day.maxtemp_c;
    outData.mintemp_c = inData[count].day.mintemp_c;
    outData.maxwind_kph = inData[count].day.maxwind_kph;
    outData.text = inData[count].day.condition.text;
    outData.icon = inData[count].day.condition.icon;

    return outData;
}

const DayInfo = (props) => {
    let {date, maxtemp_c, mintemp_c, text, icon, maxwind_kph} = props.dayInfo;

    if (!props.dayInfo) return false;

    return <div className="result__day">
        <h3 className="result__title">{date}</h3>
        <p className="result__info">
            <img className="result__icon" src={icon} alt="pic"/>
        </p>
        <p className="result__text">
            {text}<br/>
            Днем: {maxtemp_c.toFixed()} °C<br/>
            Ночью: {mintemp_c.toFixed()} °C<br/>
            Ветер: {(maxwind_kph * 1000 / 3600).toFixed(1)} м/с
        </p>
    </div>
}

const WeekInfo = (props) => {
    if (Object.keys(props.weekInfo).length == 0) {
        return false;
    } else if (props.weekInfo.isError) {
        return <div className="error">
            <p className="error__message">Проверте правильность названия города, например Kiev</p>
        </div>
    }

    let weekDaysforecast = props.weekInfo.weather.forecast.forecastday;

    if (weekDaysforecast.length) {
        const list = weekDaysforecast.map((item, index) => {
            return <DayInfo key={index} dayInfo={parseForecastData(store.getState(), index)}/>;
        });

        return <div className="result__week">
            <h3 className="result__title">Прогноз на неделю:</h3>
            <div className="result__days-wrap">
                {list}
            </div>
        </div>
    }
}


export class Result extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <section className="result">
            <DayInfo dayInfo={parseForecastData(store.getState())}/>
            <WeekInfo weekInfo={store.getState()}/>
        </section>
    }
}