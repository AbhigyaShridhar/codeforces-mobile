import React from 'react'
import {
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'


import SettingsScreen from './screens/SettingScreen'
import LoginScreen from './screens/LoginScreen'
import {store, persistor} from './redux/store'

const MainStack = createStackNavigator(
  {
    ContactList: ListScreen,
    ContactDetails: DetailsScreen,
    AddContact: AddContactScreen,
  },
  {
    initialRouteName: 'ContactList',
    navigationOptions: {
      headerTintColor: '#a41034',
      headerStyle: {
        backgroundColor: '#fff',
      },
    },
  }
)
MainStack.navigationOptions = {
  tabBarIcon: ({focused, tintColor}) => (
    <Ionicons name={`ios-contacts${focused ? '' : '-outline'}`} size={25} color={tintColor} />
  ),
}




const MainTabs = createBottomTabNavigator(
  {
    //Contacts: MainStack,
    Settings: SettingsScreen,
  },
  {
    tabBarOptions: {
      activeTintColor: '#a41034',
    },
  }
)


const MainTabs = createBottomTabNavigator();
function tabs() {
  return (
    <MainTabs.Navigator>
      <MainTabs.Screen name = "Settings" component = {SettingsScreen}/>
    </MainTabs.Navigator>
  );
}

const AppNavigator = createSwitchNavigator({
  Login: LoginScreen,
  Main: MainTabs,
  },
  {
    initialRouteName: 'Login',
  }
)


export default class App extends React.Component {
  state = {
    //contacts,
  }
render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    )
  }
}
