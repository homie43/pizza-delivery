import React from "react";

import { useSelector } from "react-redux";
import { setCategoryId, setCurrentPage, selectFilter } from "../redux/slices/filterSlice";
import { selectPizzaData, fetchPizzas } from "../redux/slices/pizzaSlice";

import Skeleton from "../components/Skeleton";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination/Pagination";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const dispatch = useAppDispatch();

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : ``;
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "desc" : "asc"; // лютая конструкция, но она работает
    const search = searchValue ? `&search=${searchValue}` : ``;

    dispatch(
      fetchPizzas({
        category,
        sortBy,
        order,
        search,
        currentPage: String(currentPage),
      })
    );
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0); // чтоб при первом рендере пользователя скроллило вверх
    getPizzas();
    // eslint-disable-next-line
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const onChangeCategory = React.useCallback((idx: number) => {
    // оптимизация ре рендера
    dispatch(setCategoryId(idx));
    // eslint-disable-next-line
  }, []);

  const onChangePage = (num: number) => {
    dispatch(setCurrentPage(num));
  };

  const pizzas = items
    .filter((item: any) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />); // рендер фейкового массива

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error">
          <h2>Ошибка 😕</h2>
          <p>Не удалось загрузить пиццы. Попробуйте повторить попытку позже</p>
        </div>
      ) : (
        <div className="content__items">{status === "loading" ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
