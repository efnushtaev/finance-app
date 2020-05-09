import React from 'react';
import StockChartBar from './StockChartBar';
import { connect } from 'react-redux';

class StockChartBarContainer extends React.Component {
    render (){

        return (

            <StockChartBar priceDiffer={this.props.priceDiffer}/>
        )
    }
}
let mapStateToProps = (state) => ({
    priceDiffer: state.stockData.priceDifferenceForPeriod
})

export default connect(mapStateToProps, null)(StockChartBarContainer)