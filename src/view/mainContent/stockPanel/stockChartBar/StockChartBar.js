import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.section`
height: 100%;
width: 100%;
display: flex;
flex-direction: row;
    &>*{
        padding:10px
    }
`

const StockChartBar = ({
    stockName,
    stockValue,
    priceDifferValue,
    advice,
    stochasticValue,
    rsiValue,
    id,
    deleteObservableStock,
    addStockToPortfolio,
    addStockToWatchlist

}) => {
    return stockName ?
        <StyledWrapper>
            <div>{advice}</div>
            <div>
                <div>
                    <span>{stockName}</span>
                    <span>${stockValue}</span>
                </div>
                <div>
                    <span>{stockName}</span>
                    <span>{priceDifferValue}</span>
                </div>
            </div>
            <div>
                <div>Stoch:{stochasticValue}</div>
                <div>Rsi:{rsiValue}</div>
            </div>
            <div>
                <button onClick={() => {addStockToPortfolio(stockName)} }>AddToPortfolio</button>
                <button onClick={() => {addStockToWatchlist(stockName)} }>AddToWatchlist</button>
            </div>
            <button onClick={() => {deleteObservableStock(id)} }>x</button>
            <span style={{float:"right"}}>{priceDifferValue}</span>
        </StyledWrapper> :
        null
}

export default StockChartBar