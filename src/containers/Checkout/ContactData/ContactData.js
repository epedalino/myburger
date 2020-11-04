import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from '../ContactData/ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      zipCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Linda Kay',
        address: {
          street: 'Teststreet 1',
          zipcode: '42367',
          country: 'USA'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'priority'
    }
    console.log('Order: ' + JSON.stringify(order))
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
        })
      .catch(error => {
        this.setState({ loading: false });
      } );
  }

  render () {
    let form = (
      <form>
          <Input inputtype="input" name="name" placeholder="Your Name" />
          <Input inputtype="input" name="email" placeholder="Your email" />
          <Input inputtype="input" name="street" placeholder="Street" />
          <Input inputtype="input" name="zip" placeholder="Zip Code" />
          <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
