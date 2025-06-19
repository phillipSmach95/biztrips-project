
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Link } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>

        <Typography  >
          
          {/* Logo Button */}
          <Link
            component={NavLink}
            to={"/"}
          >
            <img
              src="/images/logo.png"
              alt="Logo"
              style={{ width: "fit-content", height: "50px", marginRight: "10px" }}
            />
          </Link>

        </Typography>
       

          <Link
            component={NavLink}
            to={"/trips"}

          >
            Trips
          </Link>

       
          <Link
            component={NavLink}
            to={"/newtripform"}
          >
            New Trip
          </Link>


          <Link
            component={NavLink}
            to={"/meetings"}
          >
            Meetings
          </Link>
      
          <Link
            component={NavLink}
            to={"/employees"}
          >
            Employees
          </Link>
      
      </Toolbar>
    </AppBar >
  );
}
