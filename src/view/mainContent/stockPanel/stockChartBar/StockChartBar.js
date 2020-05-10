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
    rsiValue
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
                <span>AddToPortfolio</span>
                <span>AddToWatchlist</span>
            </div>
            <div>x</div>
            <span style={{float:"right"}}>{priceDifferValue}</span>
        </StyledWrapper> :
        null
}

export default StockChartBar