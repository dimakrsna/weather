import React from 'react';

import { Header } from './header/header';
import { Form } from './form/form';
import { Result } from './result/result';
import { store } from "../store/reducers/weatherReducer";;

export class App extends React.Component {

    constructor(props){
        super(props);
        this.isError = store.getState();
    }

    componentWillUpdate(){
        this.isError = store.getState()
    }

    render(){
        return (
            <div className={ (this.isError.isError) ? 'weather error' : 'weather'}>
                <Header location={store.getState()}/>
                <Form />
                <Result forecast={store.getState()} />
            </div>
            )
    }
}

