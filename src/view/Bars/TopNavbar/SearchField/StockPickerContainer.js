import React from 'react';
import StockPicker from './StockPicker';
import { setNewStock} from '../../../../redux/reducers/stockReducer';
import { connect } from 'react-redux';
import { getSourceDataType, getApiKey } from '../../../../redux/Selectors/stockSelectors';

class StockPickerContainer extends React.Component {
    render() {
        return (
            <StockPicker 
                sourceDataType={this.props.sourceDataType}
                apiKey={this.props.apiKey}
                setNewStock={this.props.setNewStock}
            />
        )
    }
}

let mapStateToProps = (state) => ({
    sourceDataType: getSourceDataType(state),
    apiKey: getApiKey(state)
})

export default connect(mapStateToProps, {setNewStock})(StockPickerContainer)