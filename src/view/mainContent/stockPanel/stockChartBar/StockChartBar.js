import React from 'react';

const StockChartBar = ({priceDifferValue}) => {
    
    return (
        <span style={{float:"right"}}>{priceDifferValue}</span>
    )
}

export default StockChartBar