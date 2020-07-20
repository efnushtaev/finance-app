import './App.css';
import { connect } from 'react-redux';
import React from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from './view/Bars/Sidebar';
import TopNavbar from './view/Bars/TopNavbar/TopNavbar';
import StockChartPanelContainer from './view/mainContent/stockPanel/StockChartPanelContainer';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    position: 'relative',
    top: '80px',
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));


const App = (props) => {
  const classes = useStyles();
  const {watchList, portfolioList} = props;
  
  const [open, setOpen] = React.useState(false);
  const handleDrawerToggle = () => setOpen(!open);

  return (
    <div className={classes.root}>
      <TopNavbar handleDrawerToggle={handleDrawerToggle} open={open}/>
      <Sidebar 
        open={open}
        watchList={watchList}
        portfolioList={portfolioList}/>
      <main className={clsx(classes.content, {[classes.contentShift]: open })}>
        <StockChartPanelContainer />
      </main>
    </div>
  );
}

let mapStateToProps = (state) => ({
  isSidebarOpen: state.stockData.isSidebarOpen,
  watchList: state.stockData.watchList,
  portfolioList: state.stockData.portfolioList
})

export default connect(mapStateToProps, {})(App);
