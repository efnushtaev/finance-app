import React from "react";
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  SomeContent: {
    background: '#f1f1f1',
    height: "100%",
    boxSizing: 'border-box'
  },
  wrapper: {
    height: '100%',
    width: 100 + theme.spacing(2)
  },
  paper: {
    left: 100,
    zIndex: 1,
    position: "relative",
    margin: theme.spacing(1)
  },
  svg: {
    width: 100,
    height: 100
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1
  }
}));

const SomeContent = React.forwardRef((props, ref) => <div {...props} ref={ref}>Hello, World!</div>);

export default function SimpleSlide({isSidebarOpen}) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(prev => !prev);
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Slide direction="right" in={isSidebarOpen} mountOnEnter unmountOnExit>
        <SomeContent className={classes.SomeContent}/>
        </Slide>
      </div>
    </div>
  );
}
