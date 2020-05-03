import * as axios from 'axios';

//https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo

const instance = axios.create({
    baseURL:"https://www.alphavantage.co/"
});

export const StockAPI = {
    getStock( stockFunction, currentStock, apikey ) {
        return instance.get(`query?function=${stockFunction}&symbol=${currentStock}&apikey=${apikey}`)
            .then( response => response.data )
    }
}