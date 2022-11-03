import React from "react";
import styles from "./Search.module.scss";

const Search = ({ searchValue, setSearchValue }) => {
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
