import React from 'react'
import styles from './Search.module.scss'
import { SearchContext } from '../../App';

const Search = () => {
  const {searchValue, setSearchValue} = React.useContext(SearchContext);//addEventListener

  return (
        <div className={styles.root}>
         <svg
         className={styles.icon} 
         enableBackground="new 0 0 50 50" 
         height="50px" 
         id="Layer_1" 
         version="1.1" 
         viewBox="0 0 50 50" 
         width="50px"  
         xmlns="http://www.w3.org/2000/svg" >
          <rect 
          fill="none" 
          height="50" 
          width="50"/>
            <circle 
            cx="21" 
            cy="20" 
            fill="none" 
            r="16" 
            stroke="#000000" 
            strokeLinecap="round" 
            strokeMiterlimit="10" 
            strokeWidth="2"/>
              <line 
              fill="none" 
              stroke="#000000" 
              strokeMiterlimit="10" 
              strokeWidth="4" 
              x1="32.229" 
              x2="45.5" 
              y1="32.229" 
              y2="45.5"/></svg>
          <input 
          value = {searchValue}
          onChange={(event)=>setSearchValue(event.target.value)} 
          className={styles.input} 
          placeholder='Поиск пиццы ...' />
          {searchValue && <svg
              onClick={()=>setSearchValue('')}
              className={styles.clearIcon}
              height="512px" 
              id="Layer_1" 
              version="1.1" 
              viewBox="0 0 512 512" 
              width="512px" 
              xmlns="http://www.w3.org/2000/svg" ><path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/></svg>}
        </div>
        
    )
}

export default Search;