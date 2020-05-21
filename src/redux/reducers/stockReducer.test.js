import React from 'react';
import {stockReducer, addStockToWatchlist, addStockToPortfolio, shiftedSidebar} from './stockReducer';

it('length of an watchList array should be incremented', () => {
    let action = addStockToWatchlist('set to watchList tested');
    let state = {
        watchList: []
    }
    let newState = stockReducer(state, action)
    expect(newState.watchList.length).toBe(1)
});

it('length of an portfolioList array should be incremented', () => {
    let action = addStockToPortfolio('set to portfolioList tested');
    let state = {
        portfolioList: []
    }
    let newState = stockReducer(state, action)
    expect(newState.portfolioList.length).toBe(1)
})

it('value should be true', () => {
    let action = shiftedSidebar('shifting sidebar tested');
    let state = {
        isSidebarOpen: true
    }
    let newState = stockReducer(state, action)
    expect(newState.isSidebarOpen).toBe(false)
})