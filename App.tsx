import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ReminderList from "./screens/ReminderList";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ModifyReminder from "./screens/ModifyReminder";
import { useEffect, useState } from "react";
import { init } from "./util/database";
import * as SplashScreen from "expo-splash-screen";
import { Pressable } from "react-native";
import { GlobalStyles } from "./constants/styles";
import HandleNotifications from "./components/HandleNotifications";

SplashScreen.preventAutoHideAsync();

export type ReminderStackParamList = {
  ReminderList: undefined;
  ModifyReminder: { reminderId: string } | undefined;
};

const Stack = createNativeStackNavigator<ReminderStackParamList>();
const BottomTabs = createBottomTabNavigator();

const RemindersOverview = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.purple700,
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="ReminderList"
        component={ReminderList}
        options={({ navigation }) => ({
          title: "My Reminder App",
          headerRight: ({ tintColor }) => (
            <Pressable onPress={() => navigation.navigate("ModifyReminder")}>
              <MaterialCommunityIcons
                name="note-plus-outline"
                color={tintColor}
                size={22}
              />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="ModifyReminder"
        component={ModifyReminder}
        options={{
          headerBackTitle: "Back",
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => setDbInitialized(true))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    async function onInit() {
      await SplashScreen.hideAsync();
    }

    if (dbInitialized) {
      onInit();
    }
  }, [dbInitialized]);

  if (!dbInitialized) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <HandleNotifications />
   
          <RemindersOverview
      
          />
         
        
      </NavigationContainer>
    </>
  );
}
