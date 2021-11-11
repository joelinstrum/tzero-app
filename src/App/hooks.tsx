import { useContext, useEffect } from "react";
import AppContext from "./AppContext";

export const useSort = (sortColumn: string, sortDirection: string) => {
  const { appUsers, setAppUsers } = useContext(AppContext);

  useEffect(() => {
    if (appUsers && appUsers.length > 0) {
      const _appUsers = [...appUsers];
      const sorted = _appUsers.sort((a: IUser, b: IUser) => {
        if (sortDirection === "asc") {
          return a[sortColumn] > b[sortColumn] ? 1 : -1;
        } else {
          return a[sortColumn] < b[sortColumn] ? 1 : -1;
        }
      });
      setAppUsers(sorted);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortColumn, sortDirection, setAppUsers]);
};
