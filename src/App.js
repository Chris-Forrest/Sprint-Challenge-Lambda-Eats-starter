import React, { useState, useEffect } from "react";
import { Route, Link, Switch } from "react-router-dom";
import "./App.css";
import "./Assets/Pizza.jpg";
import Form from  "./components/pizzaForm";
import * as yup from "yup";
import styled from "styled-components";
import axios from "axios"

const styledImg = styled.img`
width:80%;
height:40%;

`
const styledNav = styled.nav`
display:flex;
justify-content:space evenly;
font-size: 20px;

`

const initialFormValues = {
  name: '',
  size: 'Select Size',
  specialInstructions: '',
  toppings: {
    pepperoni: false,
    mushroom: false,
    sausage: false,
    olives: false,
  },
  
}

const initialFormErrors = {
  name: "",
};

const formValidation = yup.object().shape({
  name: yup
    .string()
    .min(2, "username must have at least 2 characters!")
    .required("username is required!"),
    size: yup.string(),
    pepperoni: yup.string(),
    mushroom: yup.string(),
    sausage: yup.string(),
    olives: yup.string(),
    specialInstructions: yup.string(),
});

const App = () => {
  const [orders, setOrders] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formDisabled, setFormDisabled] = useState(true);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const changeValues = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    yup
      .reach(formValidation, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        
        console.log(err);
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    formValidation.isValid(formValues).then((valid) => {
      setFormDisabled(!valid);
    });
  }, [formValues]);

  const checkboxChange = (event) => {
    const { name } = event.target
    const isChecked = event.target.checked
    setFormValues({
      ...formValues,
      toppings: {
        ...formValues.toppings,
        [name]: isChecked,
      }
    });
  };

  const postOrder = (order) => {
    axios.post("https://reqres.in/api/orders", order)
    .then(res => {
      console.log(res)
      setOrders([...orders, res.data]);
    })
    .catch(err => {
      debugger
    })  
    
  };

  const submitOrder = (event) => {
    event.preventDefault();

    const newOrder = {
      name: formValues.name,
      size: formValues.size,
      specialInstructions: formValues.specialInstructions,
      toppings: Object.keys(formValues.toppings)                                 
         .filter(topping => formValues.toppings[topping] === true)                                                             
      
    };

    
    // console.log(newUser)
    postOrder(newOrder);
    setFormValues(initialFormValues);
  };


  return (
    <div className="container">
      <header>
        <div className="navigation">
          <h1>Pizza Your Way</h1>
          <styledNav>
            <Route path="/">
              <Link to="/home">Home</Link>
              <Link data-cy_order_link="cy_order_link"to="/pizza">Order</Link>
              <Link>Help</Link>
            </Route>
          </styledNav>
        </div>
      </header>
      <section>
        <Route path="/home">
          <div>
            <div className="heroImage">
              <styledImg src={require("./Assets/Pizza.jpg")} alt="a pizza" />
            </div>
            <div>
              <h2>Order Now!</h2>
              <p>Special Deal Today only!</p>
            </div>
          </div>
        </Route>
        <Route path="/pizza">
          <Form
            values={formValues}
            changeValues={changeValues}
            checkboxChange={checkboxChange}
            submitOrder={submitOrder}
            disabled={formDisabled}
            errors={formErrors}
          />
          {orders.map((order) => {
            return (
              <div>
                <h2>{order.name}</h2>
                <p>{order.size}</p>
                <p>Toppings: {order.toppings}</p>
                <p>Special Instructions: {order.specialInstructions}</p>
              </div>
            );
          })}
        </Route>
      </section>
      <footer></footer>
    </div>
  );
};
export default App;
 






  