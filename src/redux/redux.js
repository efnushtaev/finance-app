import { createStore, combineReducers, applyMiddleware } from "redux";
import { stockReducer } from "./reducers/stockReducer";
import thunkMiddlewear from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';

let reducers = combineReducers({
    stockData: stockReducer,
    form: formReducer
})


let store = createStore(reducers, applyMiddleware(thunkMiddlewear));

window.store = store.getState()

export default store