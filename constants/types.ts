export type StackParamList = {
  Splash: undefined;
  Login: undefined;
};

/////////////////////////

import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type PropsSplash = NativeStackScreenProps<StackParamList, 'Splash'>;

export type PropsLogin = NativeStackScreenProps<StackParamList, 'Login'>;

/////////////////////////

import { StatusBarProps } from 'react-native';

export type CustomStatusBarProps = {
  backgroundColor: string;
} & StatusBarProps;