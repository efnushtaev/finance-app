import React from 'react';
import StockChart from './StockChart'

class StockChartContainer extends React.Component{

    render(){
      return this.props.stockData ? <StockChart stock={this.props.stockData}/> : null
    }
}
  
export default StockChartContainer;