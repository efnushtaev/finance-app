import React from 'react';
import { updateCurrentDataStock  } from '../../../../redux/reducers/stockReducer';
import StockChart from './StockChart'
import { connect } from 'react-redux';
import { appleStock } from '@vx/mock-data';
import demoData from '../../../StockDataJSON.json';

class StockChartContainer extends React.Component{
  // constructor(props){
  //   super(props); 
  //   this.state = { 
  //     stock: this.props.currentStockData
  //   }
  // }
  
  // dataModified(stockData) { 
  //   let result = []
  //   for (let [key, value] of Object.entries(stockData)) {
  //     result.push({date:key + 'T07:00:00.000Z', close:value['4. close']}) 
  //   }
  //   let reverse = result.reverse()
  //   this.setState({stock:reverse})
  //   console.log("stock transform")
  //   console.log(reverse)
  //   return reverse
  // }
  
  componentDidMount() {
    this.props.updateCurrentDataStock(this.props.currentStockData)
    console.log("componentChart mount")
  }



    render(){
      return this.props.currentStockData ? <StockChart {...this.props} stock={this.props.currentStockData}/> : null
    }
}


let mapStateToProps = (state) => ({
    currentStock: state.stockData.currentStock,
    stockFunction: state.stockData.stockFunction,
    apikey: state.stockData.apikey,
    currentStockData: state.stockData.stockData
  })
  
  
export default connect(mapStateToProps, { updateCurrentDataStock})(StockChartContainer);