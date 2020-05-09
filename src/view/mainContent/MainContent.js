import React from 'react'
import StockPanel from './stockPanel/StockPanel'
import StockPickerContainer from './../StockPickerContainer'

const MainContent = () => {
    return (
        <>
            <StockPickerContainer />
            <StockPanel />
        </>
    )
}

export default MainContent