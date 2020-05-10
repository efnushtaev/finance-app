import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { stockReducer } from "./reducers/stockReducer";
import thunkMiddlewear from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';

let reducers = combineReducers({
    stockData: stockReducer,
    form: formReducer
})

//redux devtool extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddlewear)));

window.store = store.getState()

export default store