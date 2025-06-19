
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>

        <Typography  >
          
          {/* Logo Button */}
          <Button
            component={NavLink}
            to={"/"}
          >
            <img
              src="/images/logo.png"
              alt="Logo"
              style={{ width: "fit-content", height: "50px", marginRight: "10px" }}
            />
          </Button>

        </Typography>
       

          <Button
            component={NavLink}
            to={"/trips"}

          >
            Trips
          </Button>

       
          <Button
            component={NavLink}
            to={"/newtripform"}
          >
            New Trip
          </Button>


          <Button
            component={NavLink}
            to={"/meetings"}
          >
            Meetings
          </Button>
      
          <Button
            component={NavLink}
            to={"/employees"}
          >
            Employees
          </Button>
      
      </Toolbar>
    </AppBar >
  );
}
