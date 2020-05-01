import React, { Component } from "react";
import axios from "axios";
import Jumbotron from "../components/Jumbotron";
import Nav from "../components/Nav";
import Input from "../components/Input";
import Button from "../components/Button";
import API from "../Utils/API";
import { DrinkList, DrinkListItem } from "../components/DrinkList";
import { Container, Row, Col } from "../components/Grid";
import { IngredientList, IngredientListItem } from "../components/IngredientList";


class Drinks extends Component {
  state = {
    drinks: [],
    drinkSearch: "",
    ingredients: []
  };
  handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    //const { name, value } = event.target;
    this.setState({
      drinkSearch: event.target.value
    });
  };
  handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get drinks update the drinks state
    event.preventDefault();
    API.getDrinkAPI(this.state.drinkSearch)
      .then(res =>{
        console.log(res)
        this.setState({ drinks: res.data.drinks })
      })
      .catch(err => console.log(err));
  };

  async generateIngredients() {
    const ingr = await axios.get(`https://www.thecocktaildb.com/api/json/v1/c22e73525cmshd4b903fea7d9db9p1297efjsn1aadaafbd701/list.php?i=list`);

    
  };

  showIngredients = event => {
    event.preventDefault();
    API.ingredientList(this.state)
    console.log(this.state)
      .then(res => {
        console.log(res)
        this.setState({ ingredients: res.data.drinks})
      })
      .catch(err => console.log(err));
  }
  
  render() {
    return (
      <div>
          <Jumbotron />
        <Nav />
      
        <Container>
          {/* Row that holds the search input */}
          <Row className = "row">
            <Col size="md-12">
              <form>
                <Container>
                  <Row>
                    <h1 className ="enter">Enter A Drink To Search For</h1>
                    <Col size="xs-9 sm-10">
                      <Input
                        name="drinkSearch"
                        value={this.state.drinkSearch}
                        onChange={this.handleInputChange}
                        placeholder="Search For a drink"/>
                    </Col>
                     {/* Row that holds the search input */}
                    <Col size="xs-3 sm-2">
                      <Button
                        onClick={this.handleFormSubmit}
                        type="success"
                        className="input-lg">
                        Search
                      </Button>
                      <Button onClick={this.generateIngredients}>Ingredients</Button>
                    </Col>
                  </Row>
                </Container>
              </form>
            </Col>
          </Row>
          {/* Row Ends that holds the search*/}
          <Row>
            <Col size="xs-12">
              {this.state.drinks.length ? (
                  <DrinkList>
                  {this.state.drinks.map(drink => {
                    console.log(drink);
                    return (
                      <DrinkListItem
                        key={drink.idDrink}
                        name={drink.strDrink}
                        id={drink.idDrink}
                        thumbnail={drink.strDrinkThumb}
                        website_url={drink.website_url}
                        onClick={API.savedrink}

                        />
                        );
                      })}
                </DrinkList>
              ) : (
                <h4 className="text-center no-bee">No Drinks to Display</h4>
              )}
            </Col>
          </Row>
          <Row>
            <Col size="xs-12">
              {this.state.ingredients.length ? (
                  <IngredientList>
                  {this.state.ingredients.map(ingredient => {
                    console.log(ingredient);
                    return (
                      <IngredientListItem
                        name={ingredient.strIngredient1}
                        />
                        );
                      })}
                </IngredientList>
              ) : (
                <h4 className="text-center no-bee">No Ingredients to Display</h4>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Drinks;