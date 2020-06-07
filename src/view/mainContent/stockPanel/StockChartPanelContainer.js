import React from 'react';
import StockChartContainer from './stockChart/StockChartContainer'
import StockChartBar from './stockChartBar/StockChartBar';
import { connect } from 'react-redux';
import { deleteObservableStock, addStockToPortfolio, addStockToWatchlist } from '../../../redux/reducers/stockReducer';
import { getObservableStock } from '../../../redux/Selectors/stockSelectors';

class StockChartPanelContainer extends React.Component {
    render() {
        return (
            this.props.observableStock.map((e, index) => {
                return (
                    <div key={index}>
                        <StockChartBar
                            id={index}
                            stockName={e.stockName}
                            stockValue={e.stockValue}
                            priceDifferValue={e.priceDifferValue}
                            advice={e.advice}
                            stochasticValue={e.stochasticValue}
                            rsiValue={e.rsiValue}
                            deleteObservableStock={this.props.deleteObservableStock}
                            addStockToPortfolio={this.props.addStockToPortfolio}
                            addStockToWatchlist={this.props.addStockToWatchlist}
                        />
                        <StockChartContainer stockData={e.stockData}/>
                    </div>
                )
            })
        )
    }
}

let mapStateToProps = (state) => ({
    observableStock: getObservableStock(state)
})

export default connect(mapStateToProps, {deleteObservableStock, addStockToPortfolio, addStockToWatchlist})(StockChartPanelContainer)