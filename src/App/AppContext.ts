import { createContext } from "react";
export const initialValues: IContext = {
  appUsers: [],
  setAppUsers: (user: IUser) => {},
};
const AppContext = createContext<IContext>(initialValues);

export default AppContext;
