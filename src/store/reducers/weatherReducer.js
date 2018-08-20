import { createStore } from 'redux';

function weatherReducer(state = {}, action){
    switch (action.type){
        case 'CITY':
            return {
               ...state, weather: action.payload
            };
        case 'ERROR':
            return {
               ...state, isError: action.payload
            };
    }

    return state;
}

export const store = createStore(weatherReducer);