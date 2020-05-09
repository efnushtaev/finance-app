import React from 'react';

const StockChartBar = ({priceDiffer}) => {
    return (
        <span style={{float:"right"}}>{priceDiffer}</span>
    )
}

export default StockChartBar