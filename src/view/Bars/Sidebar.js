import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import CollectionsBookmarkOutlinedIcon from '@material-ui/icons/CollectionsBookmarkOutlined';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { connect } from 'react-redux';
import {dispatcher} from './../../redux/reducers/stockReducer';
import { getSourceDataType, getApiKey } from '../../redux/Selectors/stockSelectors';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: '65px',
    height: `calc( 100% - 65px)`,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
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

const Sidebar = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState([true, true]);
  const {watchList, portfolioList, sourceDataType, apiKey} = props;

  const handleClick = (e) => {
    const id = e.currentTarget.id
    const result = open.map((el, i) => {
      return i === Number(id) ? !el : el
    })
    setOpen(result);
  };

  const handleListClick = (stockName) => {
    props.setNewStock(sourceDataType, stockName, apiKey)
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={props.open}
      classes={{ paper: classes.drawerPaper }}
    >
      <List>
        <ListItem button id={"0"} onClick={(id) => handleClick(id)}>
          <ListItemIcon>
            <CollectionsBookmarkOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Portfolio" />
          {open[0] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open[0]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {portfolioList.map((el) => {
              return  <ListItem  onClick={() => handleListClick(el)} button className={classes.nested}>
                <p>{el}</p>
              </ListItem>
            })}
          </List>
        </Collapse>

        <ListItem button id={"1"} onClick={(id) => handleClick(id)}>
          <ListItemIcon>
            <VisibilityOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Watchlist" />
          {open[1] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open[1]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
          {watchList.map((el) => {
              return  <ListItem onClick={() => handleListClick(el)} button className={classes.nested}>
                <p>{el}</p>
              </ListItem>
            })}
          </List>
        </Collapse>
      </List>
    </Drawer>
  )
}

let mapDispatchToProps = {
  setNewStock: dispatcher.setNewStock
}

let mapStateToProps = (state) => ({
  sourceDataType: getSourceDataType(state),
  apiKey: getApiKey(state)
})


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)