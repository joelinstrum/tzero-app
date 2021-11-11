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
