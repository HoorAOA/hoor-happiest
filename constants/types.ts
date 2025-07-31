export type StackParamList = {
  Splash: undefined;
};

/////////////////////////

import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type PropsSplash = NativeStackScreenProps<StackParamList, 'Splash'>;

/////////////////////////

import { StatusBarProps } from 'react-native';

export type CustomStatusBarProps = {
  backgroundColor: string;
} & StatusBarProps;