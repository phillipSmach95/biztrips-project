import React from "react";
 import { HashRouter as Router} from "react-router-dom"
//import {BrowserRouter } from "react-router-dom"
import {createRoot} from "react-dom/client";
import App from "./App";

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
