import React from 'react';
import StockPicker from './StockPicker';
import { addStockToObservable} from '../../../../redux/reducers/stockReducer';
import { connect } from 'react-redux';
import { getSourceDataType, getApiKey } from '../../../../redux/Selectors/stockSelectors';

class StockPickerContainer extends React.Component {
    render() {
        return (
            <StockPicker 
                sourceDataType={this.props.sourceDataType}
                apiKey={this.props.apiKey}
                addStockToObservable={this.props.addStockToObservable}
            />
        )
    }
}

let mapStateToProps = (state) => ({
    sourceDataType: getSourceDataType(state),
    apiKey: getApiKey(state)
})

export default connect(mapStateToProps, {addStockToObservable})(StockPickerContainer)