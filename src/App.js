// import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainContent from './view/mainContent/MainContent';
import { Provider, connect } from 'react-redux';
import React from 'react'
import Sidebar from './view/Sidebar/Sidebar';
import TopSidebar from './view/topSidebar/TopSidebar';
import styled from 'styled-components';
import {shiftSidebar} from './redux/reducers/stockReducer'

const StyledWrapper = styled.section `
  margin-left: auto;
  margin-right: auto;
  &>.opened {
    position: relative;
    left: 200px
  }
`

function App(props) {
  return (
    <StyledWrapper>
        <Sidebar isSidebarOpen={props.isSidebarOpen} />
        <div className={'mainContent' + (props.isSidebarOpen &&  ' opened')}>
          <MainContent 
            shiftSidebar={props.shiftSidebar}
          />
        </div>
    </StyledWrapper>
  );
}

let mapStateToProps = (state) => ({
  isSidebarOpen: state.stockData.isSidebarOpen
})
export default connect(mapStateToProps, { shiftSidebar })(App);
