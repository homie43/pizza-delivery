import React from "react";
import styles from "./Search.module.scss";

import { AppContext } from "../../App";

const Search = () => {
  const { searchValue, setSearchValue } = React.useContext(AppContext);
  return (
    <input
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      className={styles.root}
      placeholder="Поиск пиццы"
    />
  );
};

export default Search;
