import React, { useState } from "react";
import AppContext from "./AppContext";
import { defaultUser } from "./appConfig";
import { pause } from "../lib/helpers";
import UserInput from "./UserInput";

const UserForm = () => {
  const [user, setUser] = useState<IUser>(defaultUser);
  const [disabled, setDisabled] = useState(false);

  const { setAppUsers } = React.useContext(AppContext);

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

export default UserForm;
