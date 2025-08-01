import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StatusBarProps } from 'react-native';

export type StackParamList = {
  Splash: undefined;
  Login: undefined;
  MainDrawer: undefined;
  Home: undefined;
};

type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Logout: undefined;
};

/////////////////////////

export type PropsSplash = NativeStackScreenProps<StackParamList, 'Splash'>;

export type PropsLogin = NativeStackScreenProps<StackParamList, 'Login'>;

export type PropsHome = { navigation: CompositeNavigationProp<DrawerNavigationProp<DrawerParamList, 'Home'>, NativeStackNavigationProp<StackParamList>>; route: any; };

/////////////////////////


export type CustomStatusBarProps = {
  backgroundColor: string;
} & StatusBarProps;