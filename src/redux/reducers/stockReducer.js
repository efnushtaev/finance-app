import { StockAPI } from "../../data/api";
import { constant } from './../../config/constant';
import StockInstance from './../../utilities/StockInstance'

const stockFunction = constant.stockFunction;
const apikey = constant.apiKey;

const ADD_NEW_OBSERVABLE_STOCK = 'ADD_NEW_OBSERVABLE_STOCK';

let initialState = {
    currentStock: '',
    watchList: [],
    portfolio: [],
    observableStock: [
        {
            stockName: '',
            stockData: '',
            stockValue: '',
            priceDifferValue: '',
            advice: '',
            stochasticValue: '',
            stochasticRsi: ''
        }
    ],
    watchList: [],
    portfolioList: [],
    priceDifferenceForPeriod: '',
    stockFunction,
    apikey,
    stockData: null 
}

export const stockReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_NEW_OBSERVABLE_STOCK: {
            return {
                ...state,
                observableStock: [...state.observableStock, {
                    stockName: action.stockName,
                    stockData: action.stockData,
                    stockValue: action.stockValue,
                    priceDifferValue: action.priceDifferValue,
                    advice: '',
                    stochasticValue: '',
                    stochasticRsi: ''
                }]
            }
        }
        default:
            return state
    }
}

export const addNewObservableStock = (stockName, stockData, stockValue, priceDifferValue) => ({
    type: ADD_NEW_OBSERVABLE_STOCK, 
    stockName, 
    stockData, 
    stockValue, 
    priceDifferValue
})

let newStock = new StockInstance()

export const addStock = ( stockFunction, currentStock, apikey ) => (dispatch) => {
    StockAPI.getStock( stockFunction, currentStock, apikey )
    .then( res => {
        if ('Error Message' in res) {
            return 'error'
        } else {
            dispatch(addNewObservableStock(
                newStock.getStockName(res), 
                newStock.getStockData(res), 
                newStock.getStockValue(res), 
                newStock.getPriceDifferValue(res))
            )
        }
    })
}
