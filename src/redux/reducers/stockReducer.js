import { StockAPI } from "../../data/api";
import { constant } from './../../config/constant';
import StockInstance from './../../utilities/StockInstance'

const stockFunction = constant.stockFunction;
const apikey = constant.apiKey;

const   UPDATE_CURRENT_DATA_STOCK = 'UPDATE_CURRENT_DATA_STOCK',
        SET_PRICE_DIFFERENCE = "SET_PRICE_DIFFERENCE", 
        ADD_NEW_OBSERVABLE_STOCK = 'ADD_NEW_OBSERVABLE_STOCK';

let initialState = {
    currentStock: '',
    watchList: [],
    portfolio: [],
    observableStock: [
        {
            stockName: '',
            stockData: '',
            stockValue: '',
            stochasticValue: '',
            stochasticRsi: '',
            priceDifferValue: '',
            advice: ''
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
                observableStock: [...state.observableStock, action.payload],
                currentStock: action.payload
            }
        }
        case UPDATE_CURRENT_DATA_STOCK: {
            return {
                ...state,
                stockData: [...action.payload]
            }
        }
        case SET_PRICE_DIFFERENCE: {
            return {
                ...state,
                priceDifferenceForPeriod: action.payload
            }
        }

        default:
            return state
    }
}

export const addNewObservableStock = payload => ({type: ADD_NEW_OBSERVABLE_STOCK, payload})
export const updateCurrentDataStock = payload => ({type: UPDATE_CURRENT_DATA_STOCK, payload})
export const setPriceDifference = payload => ({type:SET_PRICE_DIFFERENCE, payload})

let newStock = new StockInstance()

export const addStock = ( stockFunction, currentStock, apikey ) => (dispatch) => {
    StockAPI.getStock( stockFunction, currentStock, apikey )
    .then( response => {
        if ('Error Message' in response) {
            return 'error'
        } else {
            dispatch(addNewObservableStock(newStock.getStockName(response)))
            dispatch(updateCurrentDataStock(newStock.getStockData(response)));
            dispatch(setPriceDifference(newStock.getPriceDifferValue(response)))
        }
    })

}
