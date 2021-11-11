import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import "./App.css";

interface IObjectKeys {
  [key: string]: string;
}

interface IUser extends IObjectKeys {
  firstName: string;
  lastName: string;
  phone: string;
}

interface IContext {
  appUsers: IUser[] | null;
  setAppUsers: Dispatch<SetStateAction<any>>;
}

const initialValues: IContext = {
  appUsers: [],
  setAppUsers: (user) => {},
};

const Context = React.createContext<IContext>(initialValues);

interface UserInputProps {
  label: string;
  defaultValue: string;
  propKey: string;
  disabled: boolean;
}

const UserInput: React.FC<UserInputProps> = ({
  label,
  defaultValue,
  disabled,
  propKey,
}) => {
  const [val, setVal] = useState("");
  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setVal(e.currentTarget.value);
  };

  useEffect(() => {
    if (disabled) {
      setVal("...");
    } else {
      setVal(defaultValue);
    }
  }, [disabled, defaultValue]);

  return (
    <div className="App-user-row">
      <div>{label}:</div>
      <div>
        <input
          type="text"
          value={val}
          onChange={changeHandler}
          disabled={disabled}
          name={propKey}
        />
      </div>
    </div>
  );
};

const defaultUser: IUser = {
  firstName: "Coder",
  lastName: "Byte",
  phone: "888-555-3333",
};

const pause = (t: number) => {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve();
    }, t);
  });
};

const UserForm = () => {
  const [user, setUser] = useState<IUser>(defaultUser);
  const [disabled, setDisabled] = useState(false);

  const { setAppUsers } = React.useContext(Context);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      firstName: { value: string };
      lastName: { value: string };
      phone: { value: string };
    };
    const newUser = {
      firstName: target.firstName.value,
      lastName: target.lastName.value,
      phone: target.phone.value,
    };
    setUser(newUser);
    addUserToDB(newUser);
  };

  const addUserToDB = async (user: IUser) => {
    setDisabled(true);
    setAppUsers((currentUsers: IUser[]) => [...currentUsers, user]);
    await pause(250);
    setUser(defaultUser);
    setDisabled(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="app-user-form">
        <div className="App-user-row">
          <div />
          <div>USER FORM</div>
        </div>
        <UserInput
          label="User first name"
          propKey="firstName"
          defaultValue={user.firstName}
          disabled={disabled}
        />
        <UserInput
          label="User last name"
          propKey="lastName"
          defaultValue={user.lastName}
          disabled={disabled}
        />
        <UserInput
          label="User phone no."
          propKey="phone"
          defaultValue={user.phone}
          disabled={disabled}
        />
        <div className="App-user-row">
          <div />
          <div>
            <button type="submit" className="app-submit-button">
              Add User
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

const useSort = (sortColumn: string, sortDirection: string) => {
  const { appUsers, setAppUsers } = React.useContext(Context);
  const _appUsers = React.useRef(appUsers);

  useEffect(() => {
    console.log(_appUsers.current);

    if (_appUsers && _appUsers.current && _appUsers.current.length > 0) {
      const sorted = _appUsers.current.sort((a: IUser, b: IUser) => {
        if (sortDirection === "asc") {
          return a[sortColumn] > b[sortColumn] ? 1 : -1;
        } else {
          return a[sortColumn] < b[sortColumn] ? 1 : -1;
        }
      });
      setAppUsers(sorted);
    }
  }, [sortColumn, sortDirection, setAppUsers]);
};

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

const App = () => {
  const [appUsers, setAppUsers] = useState([]);
  return (
    <div className="App">
      <Context.Provider value={{ appUsers, setAppUsers }}>
        <UserForm />
        <CurrentUsers />
      </Context.Provider>
    </div>
  );
};

export default App;
