import React from "react";
import styles from "./SearchInput.module.css";

const SearchInput = ({ handleSearchInputChange }) => {
  return (
    <div className={styles.white_background}>
      <form className={styles.searchForm}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search..."
          onChange={handleSearchInputChange}
        />
      </form>
    </div>
  );
};

export default SearchInput;
