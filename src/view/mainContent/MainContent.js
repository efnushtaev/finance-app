import React from 'react'
import StockChartPanelContainer from './stockPanel/StockChartPanelContainer'
import StockPickerContainer from './../StockPickerContainer'

const MainContent = () => {
    return (
        <>
            <StockPickerContainer />
            <StockChartPanelContainer />
        </>
    )
}

export default MainContent