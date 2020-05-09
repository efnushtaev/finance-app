import React from 'react';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';

const StyledWrapper = styled.section`
    display:flex;
    flex-direction: column
`

const StockPickerForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component="input" name="stock" />
            <button>Check stock</button>
        </form>
    )
}

const StockPickerFormReduxForm = reduxForm({form: 'stockPickerForm'})(StockPickerForm);

const StockPicker = (props) => {
    let addNewObservableStock = (values) => {
        props.addStock(props.stockFunction, values.stock, props.apiKey)
    }
    return (
        <StyledWrapper>
            <StockPickerFormReduxForm onSubmit={addNewObservableStock}/>
        </StyledWrapper>

    )
}

export default StockPicker