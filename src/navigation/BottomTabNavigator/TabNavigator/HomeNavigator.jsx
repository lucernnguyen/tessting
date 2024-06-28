import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ROUTES from "../../../constants/routes";
import AuthTabNavigator from "../../AuthTabNavigator/AuthTabNavigator";
import home from "../../../Login/home";
const Stack = createNativeStackNavigator();
const HomeNavigator = ({ authenticated }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.HOME}
        component={home}
        options={{ headerShown: false }}
      />
      {!authenticated && (
        <Stack.Screen
          name={"AUTH_NAVIGATOR"}
          component={AuthTabNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default HomeNavigator;

const styles = StyleSheet.create({});
