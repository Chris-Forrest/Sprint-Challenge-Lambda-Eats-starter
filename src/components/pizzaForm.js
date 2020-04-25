import React from "react";
import styled from "styled-components"

const StyledForm = styled.form`
display:flex;
flex-direction:column;
align-items:center;
border:1px solid rgb(210, 210, 210 );
border-radius: 5px;
box-shadow: 10px 8px 12px -2px rgb(128, 127, 197);
margin: 8px;
padding: 12px;
background-color:white;
width: 80%;
`;

export default function Form({
    values,
    changeValues,
    checkboxChange,
    submitOrder,
    disabled,
    errors,
  }) {
    return (
        <StyledForm>
        <h2>Your Order</h2>
        <div className="errors">
            {errors.name}
        </div>
        <label>Name</label>
        <input data-cy_name_input="cy_name_input"type="text" name="name" value={values.name} onChange={changeValues} />
        <label>Size</label>
        <select name="size" value={values.size} onChange={changeValues}>
          <option>Choose a Size</option>
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
        </select>
        <h2>Toppings</h2>
        <label>Pepperoni</label>
        <input 
        data-cy_pepperoni_check="cy_pepperoni_check"
        checked={values.toppings.pepperoni} 
        type="checkbox" name="pepperoni" 
        onChange={checkboxChange} />
        <label>Mushrooms</label>
        <input 
        data-cy_mushroom_check="cy_mushroom_check"
        checked={values.toppings.mushroom}
        type="checkbox" name="mushroom" 
        onChange={checkboxChange} />
        <label>Sausage</label>
        <input 
        data-cy_sausage_check="cy_sausage_check"
        checked={values.toppings.sausage}
        type="checkbox" 
        name="sausage" 
        onChange={checkboxChange} />
        <label>Olives</label>
        <input 
        data-cy_olives_checked="cy_olive_checked"
        checked={values.toppings.sausage}
        type="checkbox" 
        name="olives" 
        onChange={checkboxChange}/>
        <label>Special Instructions</label>
        <input type="text" onChange={changeValues} />
        <button onClick={submitOrder} disabled={disabled}>Place Order</button>
      </StyledForm> 
    )
}