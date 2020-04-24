import React, { useState, useEffect } from "react";
import { Route, Link, Switch } from "react-router-dom";
import "./App.css";
import "./Assets/Pizza.jpg";
import "./components/pizzaForm";
import * as yup from "yup";

const initialFormValues = {
  name: '',
  size: 'Select Size',
  toppings: {
    pepperoni: false,
    mushroom: false,
    sausage: false,
    olives: false,
  },
  specialInstructions: '',
}

const initialFormErrors = {
  name: "",
};

const formValidation = yup.object().shape({
  name: yup
    .string()
    .min(2, "username must have at least 2 characters!")
    .required("username is required!"),
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
        // dangit, does not validate :(
        // SET THE ERROR IN THE RIGHT PLACE
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
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.checked,
    });
  };

  const submitOrder = (event) => {
    event.preventDefault();

    const newOrder = {
      name: formValues.name,
      size: formValues.size,
      pepperoni: formValues.pepperoni,
      mushroom: formValues.mushroom,
      sausage: formValues.sausage,
      olives: formValues.olives,
      special: formValues.special
    };
    const postOrder = (order) => {
      setOrders([...orders, newOrder]);
    }
    postOrder(newOrder);
    setFormValues(initialFormValues);
    
  };

  return (
    <div className="container">
      <header>
        <div className="navigation">
          <h1>Pizza Your Way</h1>
          <nav>
            <Route path="/">
              <Link to="/home">Home</Link>
              <Link to="/pizza">Order</Link>
              <Link>Help</Link>
            </Route>
          </nav>
        </div>
      </header>
      <section>
        <Route path="/home">
          <div>
            <div className="heroImage">
              <img src={require("./Assets/Pizza.jpg")} alt="a pizza" />
            </div>
            <div>
              <h2>Order Now!</h2>
              <p>Special Deal Today only!</p>
            </div>
          </div>
        </Route>
        <Route path="/pizza">
          <pizzaForm
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
                <p>sauce: Original</p>
                <p>{order.size}</p>
                <p>Special Instructions: {order.special}</p>
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
 






  