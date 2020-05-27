import { StockAPI } from "../../data/api";
import { constant } from './../../config/constant';
import StockInstance from './../../utilities/StockInstance';
import { stockInstance } from './../../utilities/StockInstanceFunc';

const stockFunction = constant.stockFunction;
const apikey = constant.apiKey;

const ADD_NEW_OBSERVABLE_STOCK = 'ADD_NEW_OBSERVABLE_STOCK';
const DELETE_OBSERVABLE_STOCK = 'DELETE_OBSERVABLE_STOCK';
const ADD_STOCK_TO_WATCHLIST = 'ADD_STOCK_TO_WATCHLIST';
const ADD_STOCK_TO_PORTFOLIO = 'ADD_STOCK_TO_PORTFOLIO';
const SHIFT_SIDEBAR = 'SHIFT_SIDEBAR';

let initialState = {
    observableStock: [],
    watchList: [],
    portfolioList: [],
    stockFunction,
    apikey,
    stockData: null,
    isSidebarOpen: false
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
        case SHIFT_SIDEBAR: {
            return {
                ...state,
                isSidebarOpen: !state.isSidebarOpen
            }
        }
        default:
            return state
    }
}

export const shiftSidebar = () => ({type: SHIFT_SIDEBAR})
export const setStockToObservable = stockName => ({type: ADD_NEW_OBSERVABLE_STOCK, stockName})
export const deleteObservableStock = stockId => ({type:DELETE_OBSERVABLE_STOCK, stockId})

export const addStockToWatchlist = stockName => ({type:ADD_STOCK_TO_WATCHLIST, stockName})
export const addStockToPortfolio = stockName => ({type:ADD_STOCK_TO_PORTFOLIO, stockName})

export const addStockToObservable = ( stockFunction, currentStock, apikey ) => (dispatch) => {
    StockAPI.getStock( stockFunction, currentStock, apikey )
    .then( res => {
        debugger
        if ('Error Message' in res) {
            return 'error'
        } else {
            dispatch(setStockToObservable(stockInstance(res))
            )
        }
    })
}
