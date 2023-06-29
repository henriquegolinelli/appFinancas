import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { DashboardView } from "../pages/Dashboard/DashboardView";
import { TestView } from "../pages/Test/Test";
import { Provider } from "react-redux";
import store from "../redux";
import { FluxoCaixaView } from "../pages/FluxoCaixa/FluxoCaixa";
import { Movimentacoes } from "../pages/Movimentacoes/Movimentacoes";
import { Categorias } from "../pages/Categorias/Categorias";
import { ContasView } from "../pages/Contas/Contas";

const Drawer = createDrawerNavigator();

const HomeNavigator = () => (
    <Drawer.Navigator screenOptions={{ headerShown: false, drawerPosition: 'right', drawerStyle: { borderTopStartRadius: 20, borderBottomStartRadius: 20 } }}>
        <Drawer.Screen name="Dashboard" component={DashboardView} />
        <Drawer.Screen name="FluxoCaixa" component={FluxoCaixaView} options={{title: 'Fluxo de Caixa'}}/>
        <Drawer.Screen name="Movimentacoes" component={Movimentacoes} options={{title: 'Movimentações'}}/>
        <Drawer.Screen name="Categorias" component={Categorias} options={{title: 'Categorias'}}/>
        <Drawer.Screen name="Contas" component={ContasView} options={{title: 'Contas'}}/>
        <Drawer.Screen name="Teste" component={TestView} />
    </Drawer.Navigator>
)

export const AppNavigator = () => (
    <Provider store={store}>
        <NavigationContainer>
            <HomeNavigator />
        </NavigationContainer>
    </Provider>
)