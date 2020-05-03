import React from 'react';
import { setCurrentStock, updateStockData  } from '../../../../redux/reducers/stockReducer';
import StockChart from './StockChart'
import { connect } from 'react-redux';
import { appleStock } from '@vx/mock-data';
import demoData from '../../../StockDataJSON.json';

class StockChartContainer extends React.Component{
  constructor(props){
    super(props); 
    this.state = { 
      stock: this.props.currentStockData
    }
  }
  
  dataModified(stockData) { 
    let result = []
    for (let [key, value] of Object.entries(stockData)) {
      result.push({date:key + 'T07:00:00.000Z', close:value['4. close']}) 
    }
    let reverse = result.reverse()
    this.setState({stock:reverse})
    console.log("stock transform")
    console.log(reverse)
    return reverse
  }
  
  componentDidMount() {
    console.log('original' + this.props.currentStockData)
    this.props.updateStockData(this.dataModified(demoData))
    console.log("component mount")
  }



    render(){
        return <StockChart {...this.props} stock={this.props.currentStockData}/>
    }
}


let mapStateToProps = (state) => ({
    currentStock: state.stockData.currentStock,
    stockFunction: state.stockData.stockFunction,
    apikey: state.stockData.apikey,
    currentStockData: state.stockData.stockData
  })
  
  
export default connect(mapStateToProps, {setCurrentStock, updateStockData})(StockChartContainer);