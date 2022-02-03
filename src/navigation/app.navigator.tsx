import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { HomeNavigator } from "./home.navigator";
import { EcommerceNavigator } from "./ecommerce.navigator";
import { AuthNavigator } from "./auth.navigator";
import AuthContext from "../context/Auth-context";
import { useState } from "react";
/*
 * Navigation theming: https://reactnavigation.org/docs/en/next/themes.html
 */
const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // prevent layout blinking when performing navigation
    background: "transparent",
  },
};

export const AppNavigator = (): React.ReactElement => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginHandler = (email: string, password: string) => {
    if (email === "admin@novopay.in" && password === "Novopay@123") {
      setIsLoggedIn(true);
    }
  };
  const logoutHandler = () => {
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        loginHandler: loginHandler,
        logoutHandler: logoutHandler,
      }}
    >
      <NavigationContainer theme={navigatorTheme}>
        {isLoggedIn && <HomeNavigator />}
        {!isLoggedIn && <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
