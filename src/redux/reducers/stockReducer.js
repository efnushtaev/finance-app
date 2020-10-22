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
const DELETE_STOCK_FROM_PORTFOLIO = 'stock/DELETE_STOCK_FROM_PORTFOLIO';

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
            if (!state.observableStock.filter(el => el.stockName === action.payload.stockName).length)
            {
                return  {...state,
                    observableStock: [...state.observableStock, action.payload]
                }
            } else return {...state}
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
        case DELETE_STOCK_FROM_PORTFOLIO: {
            return {
                ...state,
                portfolioList: [...state.portfolioList.filter((el) => el != action.stockName)]
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

export const addStockToObservable = payload => ({type: ADD_NEW_OBSERVABLE_STOCK, payload})
export const deleteObservableStock = stockId => ({type:DELETE_OBSERVABLE_STOCK, stockId})
export const addStockToWatchlist = stockName => ({type:ADD_STOCK_TO_WATCHLIST, stockName})
export const addStockToPortfolio = stockName => ({type:ADD_STOCK_TO_PORTFOLIO, stockName})
export const deleteStockFromPortfolio = stockName => ({type:DELETE_STOCK_FROM_PORTFOLIO, stockName})

export const setNewStock = (sourceDataType, currentStock, apikey) => async dispatch => {
    try {
        let response = await StockAPI.getStock( sourceDataType, currentStock, apikey )
        if (response.hasOwnProperty("Error Message")) {
            dispatch(stopSubmit('stockPickerForm', { _error: response['Error Message'] }))
            return console.log('error')
        } else {
            dispatch(addStockToObservable(stockInstance(response)))
            dispatch(stopSubmit('stockPickerForm', { _error: response[''] }))
        }

    }
    catch(err) {
        console.log(err)
    }
    
}

export const dispatcher = {
    addStockToObservable,
    deleteObservableStock,
    addStockToWatchlist,
    addStockToPortfolio,
    setNewStock,
    deleteStockFromPortfolio
}