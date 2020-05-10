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
        // case UPDATE_CURRENT_DATA_STOCK: {
        //     return {
        //         ...state,
        //         observableStock: [...state.observableStock, action.payload],
        //         stockData: [...action.payload]
        //     }
        // }
        // case SET_PRICE_DIFFERENCE: {
        //     return {
        //         ...state,
        //         priceDifferenceForPeriod: action.payload
        //     }
        // }

        default:
            return state
    }
}

export const addNewObservableStock = (stockName, stockData, stockValue, priceDifferValue) => ({type: ADD_NEW_OBSERVABLE_STOCK, stockName, stockData, stockValue, priceDifferValue})
export const updateCurrentDataStock = payload => ({type: UPDATE_CURRENT_DATA_STOCK, payload})
export const setPriceDifference = payload => ({type:SET_PRICE_DIFFERENCE, payload})


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
            // dispatch(updateCurrentDataStock(newStock.getStockData(response)));
            // dispatch(setPriceDifference(newStock.getPriceDifferValue(response)))
        }
    })

}
