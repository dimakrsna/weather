import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';

import './css/style.css';
import { App } from './components/app';
import { store } from './store/reducers/weatherReducer';


const mapStateToProps = (state) => {
    return {
        weather: state
    }
}

const MainComponent = connect(mapStateToProps)(App);

ReactDOM.render(<Provider store={store}>
                    <MainComponent />
                </Provider>, document.getElementById("root"));