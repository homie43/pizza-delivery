import React from "react";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss";

import { AppContext } from "../../App";

const Search = () => {
  const [value, setValue] = React.useState("");
  const { setSearchValue } = React.useContext(AppContext);

  // оптимизация поиска с помощью lodash.debounce
  // рендер будет рпоисходить через секунду после окончания ввода в инпут
  const updateSerachValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 1000),
    []
  );

  const onChangeInput = (e) => {
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
