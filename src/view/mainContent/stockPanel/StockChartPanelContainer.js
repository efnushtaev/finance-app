import React from 'react';
import StockChartContainer from './stockChart/StockChartContainer'
import StockChartBar from './stockChartBar/StockChartBar';
import { connect } from 'react-redux';

class StockChartPanelContainer extends React.Component {

    render() {
        return (
            this.props.observableStock.map(e => {
                return (
                    <div>
                        <StockChartBar
                            stockName={e.stockName}
                            stockValue={e.stockValue}
                            priceDifferValue={e.priceDifferValue}
                            advice={e.advice}
                            stochasticValue={e.stochasticValue}
                            rsiValue={e.rsiValue}
                        />
                        <StockChartContainer stockData={e.stockData}/>
                    </div>
                )
            })
        )
    }
}

let mapStateToProps = (state) => ({
    observableStock: state.stockData.observableStock
})

export default connect(mapStateToProps, null)(StockChartPanelContainer)