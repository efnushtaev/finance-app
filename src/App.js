import React from 'react';
import logo from './logo.svg';
import './App.css';
import  StockPickerContainer from './view/StockPickerContainer';
import MainContentContainer from './view/mainContent/MainContentContainer';
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="App">
        <StockPickerContainer />
        <MainContentContainer />
    </div>
  );
}

export default App;
