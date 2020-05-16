import React from 'react';
import {stockReducer, addStockToWatchlist, addStockToPortfolio} from './stockReducer';

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