// import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainContentContainer from './view/mainContent/MainContentContainer';
import { Provider } from 'react-redux';
import React from 'react'
import LeftSidebar from './view/leftSidebar/LeftSidebar';
import TopSidebar from './view/topSidebar/TopSidebar';
import styled from 'styled-components';
const StyledWrapper = styled.section `
  margin-left: auto;
  margin-right: auto;
`

function App() {
  return (
    <StyledWrapper>
        {/* <LeftsideBar /> */}
        <TopSidebar />
        <LeftSidebar />
        <MainContentContainer />
        {/* <Footer /> */}
    </StyledWrapper>
  );
}

export default App;
