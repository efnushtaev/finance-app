import { StockAPI } from "../../data/api";
import { constants } from './../../config/constants';
import { stockInstance } from './../../utilities/StockInstance';
import { stopSubmit } from "redux-form";

const sourceDataType = constants.sourceDataType;
const apikey = constants.apiKey;

const ADD_NEW_OBSERVABLE_STOCK = 'stock/ADD_NEW_OBSERVABLE_STOCK';
const DELETE_OBSERVABLE_STOCK = 'stock/DELETE_OBSERVABLE_STOCK';
const ADD_STOCK_TO_WATCHLIST = 'stock/ADD_STOCK_TO_WATCHLIST';
const ADD_STOCK_TO_PORTFOLIO = 'stock/ADD_STOCK_TO_PORTFOLIO';

let initialState = {
    observableStock: [],
    watchList: [],
    portfolioList: [],
    sourceDataType,
    apikey,
    stockData: null
}

export const stockReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_NEW_OBSERVABLE_STOCK: {
            return {
                ...state,
                observableStock: [...state.observableStock, action.stockName]
            }
        }
        case ADD_STOCK_TO_WATCHLIST: {
            return {
                ...state,
                watchList: [...state.watchList, action.stockName]
            }
        }
        case ADD_STOCK_TO_PORTFOLIO: {
            return {
                ...state,
                portfolioList: [...state.portfolioList, action.stockName]
            }
        }
        case DELETE_OBSERVABLE_STOCK: {
            return {
                ...state,
                observableStock: [...state.observableStock.filter((e, index) => index != action.stockId)]
            }
        }
        default:
            return state
    }
}

export const setStockToObservable = stockName => ({type: ADD_NEW_OBSERVABLE_STOCK, stockName})
export const deleteObservableStock = stockId => ({type:DELETE_OBSERVABLE_STOCK, stockId})
export const addStockToWatchlist = stockName => ({type:ADD_STOCK_TO_WATCHLIST, stockName})
export const addStockToPortfolio = stockName => ({type:ADD_STOCK_TO_PORTFOLIO, stockName})

export const addStockToObservable = ( sourceDataType, currentStock, apikey ) => async dispatch => {
    let response = await StockAPI.getStock( sourceDataType, currentStock, apikey )
    if (response.hasOwnProperty("Error Message")) {
        dispatch(stopSubmit('stockPickerForm', { _error: response['Error Message'] }))
        return console.log('error')
    } else {
        dispatch(setStockToObservable(stockInstance(response)))
        dispatch(stopSubmit('stockPickerForm', { _error: response[''] }))
    }
}
