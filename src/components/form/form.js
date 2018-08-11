import React from 'react';
import {store} from './../../store/reducers/weatherReducer';
import { findCity } from './../../store/actions/findCityAction';
import { errorIsHappen } from "../../store/actions/errorAction";

export class Form extends React.Component {
    constructor(props){
        super(props);
    }

    sendRequest(e){
        e.preventDefault();
        let currentCity = this.refs.currentCity.value,
            self = this;

        if(typeof currentCity !== 'string'){
           return false;
        }

        fetch(`https://api.apixu.com/v1/forecast.json?key=542523482f444545a5e151807181008&q=${currentCity}&days=5&lang=ru`)
            .then(
                function(response) {
                    if (response.status !== 200) {
                        store.dispatch(errorIsHappen(true));
                        self.removeLoadIcon();
                        // console.log(store.getState())
                        return;
                    }
                    response.json().then(function(data) {
                        store.dispatch(findCity(data));
                        self.removeLoadIcon();
                        // console.log(store.getState())
                    });
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }

    addLoadIcon(elem){
        elem.className = `${elem.className} loading`;
    }

    removeLoadIcon(){
        this.refs.btn.className = 'form__btn';
    }

    render(){
        return  <form action="" className="form">
            <input type="text" className="form__input" placeholder="Название города, например Kiev" ref="currentCity" />
            <button ref="btn" className="form__btn" onClick={(e) => {
                this.sendRequest(e)
                this.addLoadIcon(e.target)
            }}></button>
        </form>
    }

}

