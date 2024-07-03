// import React from 'react';
// import styles from './SearchInput.module.css';

// const SearchInput = () => {
//   return (
//     <div className={styles.white_background}>
//       <form className={styles.searchForm}>
//         <input type="text" className={styles.searchInput} placeholder="Search..." />
//         <button className={styles.icon}><i className='fa fa-search'/></button>
//       </form>
//     </div>
//   );
// };

// export default SearchInput;


import React from 'react';
import styles from './SearchInput.module.css';

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
