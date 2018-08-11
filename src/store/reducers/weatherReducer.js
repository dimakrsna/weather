import { createStore } from 'redux';

function weatherReducer(state = {}, action){
    switch (action.type){
        case 'CITY':
            return {
                weather: action.payload
            };
        case 'ERROR':
            return {
                isError: action.payload
            };
    }

    return state;
}

export const store = createStore(weatherReducer);