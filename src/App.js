import React from "react";
import Skeleton from "./components/Skeleton";
import Categories from "./components/Categories";
import Header from "./components/Header";
import PizzaBlock from "./components/PizzaBlock";
import Sort from "./components/Sort";

import "./scss/app.scss";

function App() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("https://635fd61dca0fe3c21aa5e0a7.mockapi.io/items")
      .then((result) => result.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
              : items.map((pizza) => (
                  <PizzaBlock key={pizza.id} {...pizza} isLoading={isLoading} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
