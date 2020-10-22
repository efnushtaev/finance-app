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


const StockChartBar = (props) => {
    const {
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
    } = props

    const handleStockToPortfolioAdd = () => {
        let localStorageString = localStorage.getItem('portfolioList');
        debugger
        if(!!localStorageString) {
            if (localStorageString.indexOf(stockName) === -1) {
                addStockToPortfolio(stockName)
                localStorageString = `${localStorageString}_${stockName}`;
                localStorage.setItem('portfolioList', localStorageString)
            } return null
        } else {
            addStockToPortfolio(stockName)
            localStorageString = `${stockName}`;
            localStorage.setItem('portfolioList', localStorageString)
        }
    }
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
                <button onClick={() => handleStockToPortfolioAdd(stockName) }>AddToPortfolio</button>
                <button onClick={() => {addStockToWatchlist(stockName)} }>AddToWatchlist</button>
            </div>
            <button onClick={() => {deleteObservableStock(id)} }>x</button>
            <span style={{float:"right"}}>{priceDifferValue}</span>
        </StyledWrapper> :
        null
}

export default StockChartBar