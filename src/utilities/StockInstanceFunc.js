export const stockInstance = (data) => {

    const stockDataModified = (data) => {
        let stockData = data["Time Series (Daily)"];
        let modified = [];
        if (stockData != null) {
            for (let [key, value] of Object.entries(stockData)) {
                modified.push({date:key + 'T07:00:00.000Z', close:value['4. close']}) 
            }
            return modified.reverse()
        } return null
    }

    const getStockValue = (data) => {
        return data[data.length - 1].close
    }

    const getPriceDifferValue = (data) => {
        let modifiedData = data
        modifiedData.splice(0, modifiedData.length - 2)
        let differ = (modifiedData[1].close - modifiedData[0].close).toFixed(5)
        return modifiedData[0].close < modifiedData[1].close ? `+${differ}` : `${differ}`
    }
    
    // stochasticValue(){}
    // stochasticRsi(){}
    // advice(){}

    return {
        stockName: data['Meta Data']['2. Symbol'],
        stockData: stockDataModified(data),
        stockValue: getStockValue(stockDataModified(data)),
        priceDifferValue: getPriceDifferValue(stockDataModified(data)),
        advice: '',
        stochasticValue: '',
        rsiValue: ''
    }
}