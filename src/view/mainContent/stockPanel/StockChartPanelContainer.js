import React from 'react';
import StockChartContainer from './stockChart/StockChartContainer'
import StockChartBarContainer from './stockChartBar/StockChartBarContainer';
import { connect } from 'react-redux';


class StockChartPanelContainer extends React.Component {
    render() {
        return(

            this.props.observableStock.map(e => {
                return  <div>
                            <StockChartBarContainer props={e}/>
                            <StockChartContainer props={e}/>
                        </div>
            })
        )
    }
}


let mapStateToProps = (state) => ({
    observableStock: state.stockData.observableStock
})

export default connect(mapStateToProps, null)(StockChartPanelContainer)