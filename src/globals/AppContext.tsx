import React, { createContext, useContext, useState } from "react";

interface IAppContext {
 category: string[];
 setCategory: (e: any) => void;
 storeCategory: (e: string) => void;
}

const initialValues = {
 category: [],
 setCategory: (e: any) => {},
 storeCategory: (e: string) => {},
};
const AppContext = createContext<IAppContext>(initialValues);

export const useAppContext = () => useContext(AppContext);

interface IChildren {
 children: React.ReactChild;
}
export const AppContextProvider = ({ children }: IChildren) => {
 const [category, setCategory] = useState<string[]>([]);

 const storeCategory = (str: string): void => {
  const check = category.includes(str);
  if (check) {
   const newCategory = category.filter((cat) => cat !== str);
   setCategory(newCategory);
  } else {
   setCategory((prev) => [...prev, str]);
  }
 };
 const values = { category, setCategory, storeCategory };
 return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
