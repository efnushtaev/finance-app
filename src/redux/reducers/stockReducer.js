import { StockAPI } from "../../data/api";
import { constant } from './../../config/constant';

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
                stockData: action.payload
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

// export const getNewStock = (stockName) => ({type:ADD_NEW_OBSERVABLE_STOCK, stockName})

export const addNewObservableStock = payload => ({type: ADD_NEW_OBSERVABLE_STOCK, payload})
export const updateCurrentDataStock = payload => ({type: UPDATE_CURRENT_DATA_STOCK, payload})
export const setPriceDifference = payload => ({type:SET_PRICE_DIFFERENCE, payload})

const calculateStockPriceDiffer = () => {

}

class StockInstance {
    // constructor(stockData) {
    //     this.data = stockData
    // }
    getStockName(data){}
    getStockData(data){return data}
    stockValue(data){
        return data.splice(0, data.length - 1)
    }
    stochasticValue(data){}
    stochasticRsi(data){}
    priceDifferValue(data){
        data.splice(0, data.length - 2)
        let differ = (data[1].close - data[0].close).toFixed(5)
        return data[0].close < data[1].close ? `+${differ}` : `${differ}`
    }
    advice(){}
}

let newStock = new StockInstance()

const dataModified = (stockData) => { 
    let modified = [];
    if (stockData != null) {
        for (let [key, value] of Object.entries(stockData)) {
            modified.push({date:key + 'T07:00:00.000Z', close:value['4. close']}) 
        }
        let result = modified.reverse()
        console.log('stock modified')
        return result
    } return null
}

export const addStock = ( stockFunction, currentStock, apikey ) => (dispatch) => {
    StockAPI.getStock( stockFunction, currentStock, apikey )
    .then( response => {
        console.log(response)
        if ('Error Message' in response) {
            console.log('error')
            return 'error'
        } else {
            let payload = response["Time Series (Daily)"];
            return dataModified(payload)
        }
    }).then( response => { 
        if (response != 'error') {
            dispatch(updateCurrentDataStock(response));
            dispatch(addNewObservableStock(currentStock))
            return response
        } console.log('stock updated error')
    }).then( response => {
        dispatch(setPriceDifference(newStock.priceDifferValue(response)))
    })
}
