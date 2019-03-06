import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// HTTP request
import axios from '../../axios-orders';

// {} object
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 1,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: null
  }
  componentDidMount() {
    axios.get('https://burger-builder-ver1.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => { this.setState({ error: true}) });
  }
  // method
  updatePurchaseState(ingredients) {
    // Check purchaseable to true or false
    // const ingredients = {
    //   ...this.state.ingredients
    // };
    // Create an array of values from ingredients - these are numbers
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];
    })
    // Not flattening it. Turn it into a number: Sum of all ingredients
    // NOTE: Sum is the updated/current sum up until this iteration
    .reduce((sum, el) => {
      return sum + el;
    }, 0);
    this.setState({purchaseable: sum > 0}); //return true/false
  }
  addIngredHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1;
    const updateIngredients = {
      ...this.state.ingredients
    };
    updateIngredients[type] = updateCount;
    const priceDeduct = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceDeduct;
    this.setState({
      totalPrice: newPrice,
      ingredients: updateIngredients
    });
    this.updatePurchaseState(updateIngredients);
  }

  removeIngredHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updateCount = oldCount - 1;
    const updateIngredients = {
      ...this.state.ingredients
    };
    updateIngredients[type] = updateCount;
    const priceDeduct = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduct;
    this.setState({
      totalPrice: newPrice,
      ingredients: updateIngredients
    });
    this.updatePurchaseState(updateIngredients);
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }
  purchaseCancelHandler = () => {
    this.setState({purchasing:false});
  }
  purchaseContinueHandler = () => {
    this.setState({loading: true});
    // alert("you continue");
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'rommel',
        address: {
          street: 'test st',
          zipCode: '12352',
          country: 'US'
        },
        email: 'test@gmail.com'
      },
      deliverMethod: 'fastest'
    }
    // NOTE: Firebase setting. Add .json to baseURL
    axios.post('orders.json', order)
      .then(response => {
        // console.log(response);
        this.setState({loading:false, purchasing:false});
      })
      .catch(error => {
        // console.log(error);
        this.setState({loading:false, purchasing:false});
      });
  }
  render() {
    const disableInfo = {
      ...this.state.ingredients
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    // {salad: true, meat: false, ...}
    let orderSummary = null;
    let burger = this.state.error ? <p style={{textAlign:'center'}}>Ingredients can't load</p> : <Spinner/>;
    if (this.state.ingredients) {
       burger = (
        <Auxiliary>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
              ordered={this.purchaseHandler}
              purchaseable={this.state.purchaseable}
              price={this.state.totalPrice}
              disabled={disableInfo}
              ingredientAdded={this.addIngredHandler}
              ingredientRemove={this.removeIngredHandler}
            />
        </Auxiliary>
      );
      orderSummary = <OrderSummary
            price={this.state.totalPrice}
            ingredients={this.state.ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            />;
    }
    if (this.state.loading) {
      orderSummary = <Spinner/>;
    }
    return(
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler} >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
