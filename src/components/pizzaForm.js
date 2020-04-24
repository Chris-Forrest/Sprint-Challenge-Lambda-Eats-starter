import React from "react";

export default function Form({
    values,
    changeValues,
    checkboxChange,
    submitOrder,
    disabled,
    errors,
  }) {
    return (
        <form>
        <h2>Your Order</h2>
        <div className="errors">
            {errors.name}
        </div>
        <label>Name</label>
        <input type="text" name="name" value={values.name} onChange={changeValues} />
        <label>Size</label>
        <select value={values.size} onChange={changeValues}>
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
        </select>
        <h2>Toppings</h2>
        <label>Olives</label>
        <input type="checkbox" name="olives" onChange={checkboxChange} />
        <label>Pepperoni</label>
        <input type="checkbox" name="pepperoni" onChange={checkboxChange} />
        <label>Greenbell Peppers</label>
        <input type="checkbox" name="greenbell" onChange={checkboxChange} />
        <label>Onions</label>
        <input type="checkbox" name="onions" onChange={checkboxChange}/>
        <label>Special Instructions</label>
        <input type="text" onChange={changeValues} />
        <button onClick={submitOrder} disabled={disabled}>Place Order</button>
      </form> 
    )
}