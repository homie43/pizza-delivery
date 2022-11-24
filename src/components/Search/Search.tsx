import React from "react";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss";
import { useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");

  const location = useLocation(); // для того чтобы сделать перерисовку корзины при клике на нее

  // оптимизация поиска с помощью lodash.debounce
  // рендер будет происходить через секунду после окончания ввода в инпут
  // eslint-disable-next-line
  const updateSerachValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 1000),
    []
  );

  const onChangeInput = (e: any) => {
    dispatch(setSearchValue(value));
    setValue(e.target.value);
    updateSerachValue(e.target.value);
  };

  return (
    <>
      {location.pathname !== "/cart" && (
        <input
          value={value}
          onChange={onChangeInput}
          className={styles.root}
          placeholder="Поиск пиццы"
        />
      )}
    </>
  );
};

export default Search;
