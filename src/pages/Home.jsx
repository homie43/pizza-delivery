import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

import Skeleton from "../components/Skeleton";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination/Pagination";

import { AppContext } from "../App";

const Home = () => {
  const { searchValue } = React.useContext(AppContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const { categoryId, sort } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : ``;
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "desc" : "asc"; // лютая конструкция, но она работает
    const search = searchValue ? `&search=${searchValue}` : ``;

    axios
      .get(
        `https://635fd61dca0fe3c21aa5e0a7.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((arr) => {
        setItems(arr.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0); // чтоб при первом рендере пользователя скроллило вверх
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading // рендер фейкового массива, для красивой загрузки шести скелетонов
          ? skeletons
          : items
              .filter((item) =>
                item.title.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((pizza) => (
                <PizzaBlock key={pizza.id} {...pizza} isLoading={isLoading} />
              ))}
      </div>
      <Pagination onChangePage={(num) => setCurrentPage(num)} />
    </div>
  );
};

export default Home;
