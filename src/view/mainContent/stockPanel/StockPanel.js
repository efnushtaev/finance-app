import React from 'react';
import StockChartContainer from './stockChart/StockChartContainer'
import StockChartBarContainer from './stockChartBar/StockChartBarContainer';

const StockChartPanel = () => {

    return (
        <>
            <StockChartBarContainer />
            <StockChartContainer/>
        </>
    )
}

export default StockChartPanel