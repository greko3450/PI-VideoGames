import React, { useState } from "react";
import SearchBar from "./SearchBar.jsx"
import { searchGames } from "../redux/actions.js";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import navStyle from "./Nav.module.css"
function Nav() {

  const dispatch = useDispatch();
  let [search, setSearch] = useState("")

  const handleOnchange = (event) => {
    setSearch(event.target.value)
   
  }

  const onSearch = (event) => {
    event.preventDefault()
    dispatch(searchGames(search))
  }

  return(
    <nav>
      <SearchBar value={search} onSearch={onSearch} onChange={handleOnchange}/>
      <NavLink to="/">Landing</NavLink>
      <NavLink className={navStyle.link} to="/form">Create Games</NavLink>
    </nav>
  )
}

export default Nav;
  
  

 