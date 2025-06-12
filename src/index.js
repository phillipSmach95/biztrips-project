import React from "react";
 //import { HashRouter as Router} from "react-router-dom"
import {BrowserRouter as Router} from "react-router-dom"
import {createRoot} from "react-dom/client";
import App from "./app/App";

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
<>

<React.StrictMode>
      {/* <BrowserRouter> */}
      <Router>
        <App />
      </Router>
      {/* <BrowserRouter/> */}
  </React.StrictMode    >   

</>);
