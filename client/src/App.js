import React, { useEffect } from "react";
import axios from "axios";
import Post from "./post-component/index";
import Login from "./login-component/index";
import Signup from "./signup-component/index";

const App = () => {
  return (
    <div className="container">
      <Signup></Signup>
    </div>
  );
};

export default App;
