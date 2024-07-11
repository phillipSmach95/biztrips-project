import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><NavLink to={"/"}><img width="150px" alt="Business Trips" src="/images/logo.png" /></NavLink></li>
          <li>
              <NavLink to={"/alltrips"}>Trips</NavLink>
              </li>
              <li>
              <NavLink to={"/allmeetings"}>Meetings</NavLink>
              </li>
              <li>
              <NavLink to={"/allemployees"}>Empoyees</NavLink>
              </li>
        </ul>
      </nav>
    </header>
  );
}
