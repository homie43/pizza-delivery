import React from "react";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss";

import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");

  // оптимизация поиска с помощью lodash.debounce
  // рендер будет происходить через секунду после окончания ввода в инпут
  // eslint-disable-next-line
  const updateSerachValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 1000),
    []
  );

  const onChangeInput = (e) => {
    dispatch(setSearchValue(value));
    setValue(e.target.value);
    updateSerachValue(e.target.value);
  };

  return (
    <input
      value={value}
      onChange={onChangeInput}
      className={styles.root}
      placeholder="Поиск пиццы"
    />
  );
};

export default Search;
