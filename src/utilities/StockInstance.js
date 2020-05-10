export default class StockInstance {
    stockDataModified(data) {
        let stockData = data["Time Series (Daily)"];
        let modified = [];
        if (stockData != null) {
            for (let [key, value] of Object.entries(stockData)) {
                modified.push({date:key + 'T07:00:00.000Z', close:value['4. close']}) 
            }
            let result = modified.reverse()    
            return result
        } return null
    }

    getStockName(data){
        return data['Meta Data']['2. Symbol']
    }

    getStockData(data){
        return this.stockDataModified(data)
    }

    getStockValue(data){
        let stockData = this.stockDataModified(data)
        debugger
        return stockData[stockData.length - 1].close
    }

    getPriceDifferValue(data){
        let modifiedData = this.stockDataModified(data)
        modifiedData.splice(0, modifiedData.length - 2)
        let differ = (modifiedData[1].close - modifiedData[0].close).toFixed(5)
        return modifiedData[0].close < modifiedData[1].close ? `+${differ}` : `${differ}`
    }
    
    stochasticValue(){}
    stochasticRsi(){}
    advice(){}
}