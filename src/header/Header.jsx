import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar } from "@mui/material";

export default function Header() {
  return (

      <AppBar position="static" sx={{ backgroundColor: "#1976d2", padding: "10px" }}>

      <nav>
        <ul>
          <li><NavLink to={"/"}><img width="150px" alt="Business Trips" src="/images/logo.png" /></NavLink></li>
          <li>
              <NavLink to={"/trips"}>Trips</NavLink>
              </li>
              <li>
              <NavLink to={"/meetings"}>Meetings</NavLink>
              </li>
              <li>
              <NavLink to={"/employees"}>Empoyees</NavLink>
              </li>
        </ul>
      </nav>
      </AppBar>

  );
}
