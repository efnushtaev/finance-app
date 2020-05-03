import { StockAPI } from "../../data/api";
import { constant } from './../../config/constant';
import stockDataJSON from './../../view/StockDataJSON.json';

const stockFunction = constant.stockFunction;
const apikey = constant.apiKey;

const   SET_CURRENT_DATA_STOCK = 'SET_CURRENT_DATA_STOCK',
        UPDATED_CURRENT_DATA_STOCK = 'UPDATED_CURRENT_DATA_STOCK',
        ADD_NEW_STOCK = 'ADD_NEW_STOCK';
        // DELETE_STOCK = 'DELETE_STOCK';


let initialState = {
    currentStock: 'T',
    observableStock: [],
    stockFunction,
    apikey,
    stockData: [{date: "2019-11-19T07:00:00.000Z", close: "32.9400"}] 

}

export const stockReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_NEW_STOCK: {
        
            return {
                ...state,
                observableStock: [...state.observableStock, action.currentStock],
                currentStock: action.currentStock
            }
        }
        case UPDATED_CURRENT_DATA_STOCK: {
            
            return {
                ...state,
                stockData: action.payload
            }
        }
        case SET_CURRENT_DATA_STOCK: {
            return {
                ...state,
                stockData: action.payload
            }
        }
        default:
            return state
    }
}

// export const getNewStock = (stockName) => ({type:ADD_NEW_STOCK, stockName})

export const updateStockData = (payload) => ({type: UPDATED_CURRENT_DATA_STOCK, payload})
export const setCurrentStock = (payload) => ({type: SET_CURRENT_DATA_STOCK, payload})

const dataModified = (stockData) => { 
    let modified = []
    for (let [key, value] of Object.entries(stockData)) {
        modified.push({date:key + 'T07:00:00.000Z', close:value['4. close']}) 
    }
    let result = modified.reverse()
    console.log('stock modified:')

    return result
  }

export const addStock = ( stockFunction, currentStock, apikey ) => (dispatch) => {
    StockAPI.getStock( stockFunction, currentStock, apikey )
        .then( response => {
            console.log('response' + response)
            if ('Error Message' in response) {
                console.log('error')
                return 'error'
            } else {

                let payload = response["Time Series (Daily)"];
                return dataModified(payload)
            }
        }).then( response => { 
            if (response != 'error') {

                dispatch(setCurrentStock(response));
                console.log('stock upload: ' + response )
            } console.log('error')
        })
    // Promise.all([promise]) {
    //     dispatch({type:ADD_NEW_STOCK, currentStock});
    // }
}





// 1. 