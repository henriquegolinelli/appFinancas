import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { DashboardView } from "../pages/Dashboard/DashboardView";

const Drawer = createDrawerNavigator();

const HomeNavigator = () => (
    <Drawer.Navigator screenOptions={{headerShown: false, drawerPosition: 'right', drawerStyle: {borderTopStartRadius: 20, borderBottomStartRadius: 20}}}>
        <Drawer.Screen name="Dashboard" component={DashboardView}/>
    </Drawer.Navigator>
)

export const AppNavigator = () => (
    <NavigationContainer>
        <HomeNavigator />
    </NavigationContainer>
)