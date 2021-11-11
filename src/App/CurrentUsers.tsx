import React, { useState } from "react";
import Context from "./AppContext";
import { useSort } from "./hooks";

const CurrentUsers = () => {
  const { appUsers } = React.useContext(Context);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDir, setSortDir] = useState<string>("desc");
  useSort(sortColumn, sortDir);

  const sortHandler = (_sort: string) => {
    let dir;
    if (sortColumn === _sort) {
      dir = sortDir === "asc" ? "desc" : "asc";
    } else {
      dir = "asc";
    }
    setSortDir(dir);
    setSortColumn(_sort);
  };
  return (
    <div>
      <div className="app-table-row">
        <div className="App-link" onClick={() => sortHandler("firstName")}>
          First Name
        </div>
        <div className="App-link" onClick={() => sortHandler("lastName")}>
          Last Name
        </div>
        <div className="App-link" onClick={() => sortHandler("phone")}>
          Phone
        </div>
      </div>
      <div className="app-data-table">
        {appUsers &&
          appUsers.length > 0 &&
          appUsers.map((user, i) => (
            <div className="app-data-row" key={`user-${i}`}>
              <div>{user.firstName}</div>
              <div>{user.lastName}</div>
              <div>{user.phone}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CurrentUsers;
