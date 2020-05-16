import React from 'react';
import StockPicker from './StockPicker';
import { addStockToObservable} from './../redux/reducers/stockReducer';
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

export default connect(mapStateToProps, {addStockToObservable})(StockPickerContainer)