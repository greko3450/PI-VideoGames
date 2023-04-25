import React from "react";
import { useSelector } from "react-redux";

import searchStyle from "./Nav.module.css"



function SearchBar(props) {
  

  let errorName = useSelector(state => state.errorName)
  console.log(errorName);
  let {value, onSearch, onChange} = props
  
  return(
    <div className={searchStyle.imgStyle} >
    <div className={searchStyle.divStyle} >
      <input  className={searchStyle.search} type="text" id="search" name="search" value={value} onChange={onChange} placeholder="ingresar for games" />
      <button onClick={onSearch}>ingresar</button>
      {errorName && <p>{errorName}</p>}
      
    </div>
    </div>
  ) 
}

export default SearchBar;



    
  