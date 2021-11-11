import React, { useState } from "react";
import AppContext from "./AppContext";
import "./App.css";
import UserForm from "./AppForm";
import CurrentUsers from "./CurrentUsers";

const App = () => {
  const [appUsers, setAppUsers] = useState([]);
  return (
    <div className="App">
      <AppContext.Provider value={{ appUsers, setAppUsers }}>
        <UserForm />
        <CurrentUsers />
      </AppContext.Provider>
    </div>
  );
};

export default App;
