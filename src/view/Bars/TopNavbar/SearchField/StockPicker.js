import React from 'react';
import { Field, reduxForm } from 'redux-form';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, fade, FormControl } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    hide: {
        display: "none"
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
      },
}))


const renderTextField = ( { classes, input, label, meta: { touched, error }, ...custom },  ) => {
    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <FormControl>
                <InputBase
                placeholder="Search…"
                hintText={label}
                floatingLabelText={label}
                errorText={touched && error}
                {...input}
                {...custom}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                />
                </FormControl>
          </div>
    )
 }

const StockPickerForm = ({handleSubmit, error}) => {
    const classes = useStyles();
    return (
        <form onSubmit={handleSubmit}>
            <Field classes={classes} component={renderTextField} name="stock" />
            <button className={classes.hide} type="submit">Submit</button>
            {error && <div>{error}</div>}
        </form>
    )
}

const StockPickerFormReduxForm = reduxForm({form: 'stockPickerForm'})(StockPickerForm);

const StockPicker = ({sourceDataType, apiKey, addStockToObservable}) => {
    let addNewStock = (values) => {
        console.log(values)
        addStockToObservable(sourceDataType, values.stock, apiKey)
    }
    return (
      <StockPickerFormReduxForm onSubmit={addNewStock}/>
    )
}








export default StockPicker