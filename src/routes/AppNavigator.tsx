import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { DashboardView } from "../pages/Dashboard/DashboardView";
import { TestView } from "../pages/Test/Test";
import { TestView2 } from "../pages/Test/Teste2";

const Drawer = createDrawerNavigator();

const HomeNavigator = () => (
    <Drawer.Navigator screenOptions={{headerShown: false, drawerPosition: 'right', drawerStyle: {borderTopStartRadius: 20, borderBottomStartRadius: 20}}}>
        <Drawer.Screen name="Dashboard" component={DashboardView}/>
        <Drawer.Screen name="Teste" component={TestView}/>
        <Drawer.Screen name="Teste2" component={TestView2}/>
    </Drawer.Navigator>
)

export const AppNavigator = () => (
    <NavigationContainer>
        <HomeNavigator />
    </NavigationContainer>
)