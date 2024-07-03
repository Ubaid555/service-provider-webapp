import React from 'react';
import styles from './SearchInput.module.css';

const SearchInput = () => {
  return (
    <form className={styles.searchForm}>
      <input type="text" className={styles.searchInput} placeholder="Search..." />
      <button className={styles.icon}><i className='fa fa-search'/></button>
    </form>
  );
};

export default SearchInput;
