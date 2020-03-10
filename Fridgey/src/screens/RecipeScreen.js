import React, { useEffect, useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar
} from "react-native";
import styled from "styled-components";
import { SearchBar } from "react-native-elements";
import Card from "../components/Card/Card";
import Menu from "../components/Menu/Menu";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Recipe from "../components/Recipe/Recipe";

const YOUR_API_KEY = "5bcac43624cd4fde163db0d5b37859e3";
const YOUR_APP_ID = "53c99899";


const getRecipes = async () => {
  const req = `https://api.edamam.com/search?q=random&app_id=${YOUR_APP_ID}&app_key=${YOUR_API_KEY}&from=0&to=1`;
  const response = await fetch(req);
  const data = await response.json();
  setRecipes(data.hits);
};

function mapStateToProps(state) {
  return { action: state.action };
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () =>
      dispatch({
        type: "OPEN_MENU"
      })
  };
}

class RecipeScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };
  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1)
  };

  componentDidMount() {
    StatusBar.setBarStyle("dark-content", true);
    getRecipes();
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.timing(this.state.scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in()
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 0.5
      }).start();

      StatusBar.setBarStyle("light-content", true);
    }

    if (this.props.action == "closeMenu") {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in()
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 1
      }).start();

      StatusBar.setBarStyle("dark-content", true);
    }
  };

  render() {
    return (
      <RootView>
        <Menu />
        <AnimatedContainer
          style={{
            transform: [{ scale: this.state.scale }],
            opacity: this.state.opacity
          }}
        >
          <SafeAreaView>
            <ScrollView style={{ height: "100%" }}>
              <SearchBar> Search</SearchBar>
              <Subtitle>Based on what's in your inventory</Subtitle>
              <ScrollView
                horizontal={true}
                style={{ paddingBottom: 30 }}
                showsHorizontalScrollIndicator={false}
              >
                {cards.map((card, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      this.props.navigation.push("RecipeFull", {
                        recipeFull: card
                      });
                    }}
                  >
                    <Card
                      title={card.title}
                      image={card.image}
                      text={card.ingrediants}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <Subtitle>Random</Subtitle>

              <ScrollView
                horizontal={true}
                style={{ paddingBottom: 30 }}
                showsHorizontalScrollIndicator={false}
              >
                {recipes.map(recipe => (
                  <Recipe />
                ))}
                ;
              </ScrollView>
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
      </RootView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeScreen);

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 10px;
  text-transform: uppercase;
`;

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;

const TopBar = styled.View`
  margin-left: 20px;
  padding-top: 40px;
`;
const cards = [
  {
    title: "Apple pie",
    image: require("../../assets/background11.jpg"),
    ingrediants:
      "Ingrediants \n 1 recipe pastry for a 9 inch double crust pie  \n½ cup unsalted butter \n3 tablespoons all-purpose flour \n¼ cup of water \n½ cup of white sugar \n½ cup packed brown sugar \n8 Granny Smith apples - peeled, cored and sliced"
  },
  {
    title: "Mac and Cheese",
    image: require("../../assets/background12.jpg"),
    ingrediants:
      " Ingrediants \n 16 oz elbow macaroni, cooked (or other tubular pasta)\n1 tbsp extra virgin olive oil\n6 tbsp unsalted butter\n1/3 cup all purpose flour\n3 cups whole milk\n1 cup heavy whipping cream\n4 cups sharp cheddar cheese shredded\n2 cups Gruyere cheese shredded\nsalt and pepper to taste\n1 1/2 cups panko crumbs\n4 tbsp butter melted\n1/2 cup Parmesan cheese shredded\n1/4 tsp smoked paprika (or regular paprika)"
  },
  {
    title: "Steak with veggies",
    image: require("../../assets/background13.jpg")
  },
  {
    title: "Beef stir fry",
    image: require("../../assets/background14.jpg")
  }
];
