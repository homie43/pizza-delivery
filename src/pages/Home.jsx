import React from "react";
import Skeleton from "../components/Skeleton";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [categoryId, setCategoryId] = React.useState(0); // состояние категорий
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://635fd61dca0fe3c21aa5e0a7.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ``
      }&sortBy=${sortType.sortProperty.replace("-", "")}&order=${
        sortType.sortProperty.includes("-") ? "desc" : "asc" // лютая конструкция, но она работает
      }`
    )
      .then((result) => result.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0); // чтоб при первом рендере пользователя скроллило вверх
  }, [categoryId, sortType]); // слежу за categoryId, что бы происходил повторный рендер при выборе категории

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          setCategoryId={(i) => setCategoryId(i)}
        />
        <Sort sortType={sortType} setSortType={(i) => setSortType(i)} />
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
