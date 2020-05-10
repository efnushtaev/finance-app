import React from 'react';
import StockPicker from './StockPicker';
import { addStock } from './../redux/reducers/stockReducer';
import { connect } from 'react-redux';

class StockPickerContainer extends React.Component {
    render() {
        return(
            <StockPicker {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => ({
    stockFunction: state.stockData.stockFunction,
    apiKey: state.stockData.apiKey
})

export default connect(mapStateToProps, {addStock})(StockPickerContainer)