// import {createSelector} from 'reselect';
// export const getObservableStock = createSelector( getObservableStockSelector, (observableStock) => observableStock.filter(u => true) )

export const getObservableStock = state => state.stockData.observableStock;

export const getSourceDataType = state => state.stockData.sourceDataType;
export const getApiKey = state => state.stockData.apiKey;
