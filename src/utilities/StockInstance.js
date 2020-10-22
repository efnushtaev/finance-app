// preparing api-data to usefull format
function stockDataModified (data) {
    let stockTimeframe = "Time Series (Daily)";
    let stockData = data[stockTimeframe];
    let resultData = [];
    if (stockData != null) {
        for (let [key, value] of Object.entries(stockData)) {
            resultData.push({date:key + 'T07:00:00.000Z', close:value['4. close']}) 
        }
        return resultData.reverse()
    } return null
}

function getCurrentStockValue (data) {
    return data[data.length - 1].close
}

function getPriceDifferValue (data) {
    let differ = (data[data.length - 1].close - data[data.length - 2].close).toFixed(5)
    return data[0].close < data[1].close ? `+${differ}` : `${differ}`
}

export const stockInstance = (data) => ({
        stockName: data['Meta Data']['2. Symbol'],
        stockData: stockDataModified(data),
        stockValue: getCurrentStockValue(stockDataModified(data)),
        priceDifferValue: getPriceDifferValue(stockDataModified(data)),
        advice: '',
        stochasticValue: '',
        rsiValue: ''
    })