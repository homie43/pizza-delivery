import React from "react";
import Skeleton from "../components/Skeleton";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("https://635fd61dca0fe3c21aa5e0a7.mockapi.io/items")
      .then((result) => result.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0); // чтоб при первом рендере пользователя скроллило вверх
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading // рендер фейкового массива, для красивой загрузки шести скелетонов
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((pizza) => (
              <PizzaBlock key={pizza.id} {...pizza} isLoading={isLoading} />
            ))}
      </div>
    </div>
  );
};

export default Home;
