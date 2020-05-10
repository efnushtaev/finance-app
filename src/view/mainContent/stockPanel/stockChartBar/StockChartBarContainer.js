import React from 'react';
import StockChartBar from './StockChartBar';

class StockChartBarContainer extends React.Component {
    render (){
        return (
            <StockChartBar priceDifferValue={this.props.priceDifferValue}/>
        )
    }
}


export default StockChartBarContainer