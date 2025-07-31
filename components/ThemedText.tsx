import { Text, type TextProps, StyleSheet, KeyboardAvoidingView } from 'react-native';

import { useThemeColor } from '../hooks/colorHooks/useThemeColor';


export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'largeMedium' | 'largeBold' | 'xlargeBold' | 'xsmallBold' | 'mediumBold' | 'mediumMedium' | 'xsmallMedium';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'largeMedium',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'largeMedium' ? styles.largeMedium : undefined,
        type === 'largeBold' ? styles.largeBold : undefined,
        type === 'xlargeBold' ? styles.xlargeBold : undefined,
        type === 'xsmallBold' ? styles.xsmallBold : undefined,
        type === 'mediumMedium' ? styles.mediumMedium : undefined,
        type === 'mediumBold' ? styles.mediumBold : undefined,
        type === 'xsmallMedium' ? styles.xsmallMedium : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

// xxsmall 10
// xsmall 12
// small 14
// medium 14 
// larget 16
//  xlarge 18 
// xlarge 20

const styles = StyleSheet.create({
  mediumBold: {
    fontSize: 14,
    fontWeight: 700
  }, 
  mediumMedium: {
    fontSize: 14,
    fontWeight: 500
  }, 
  xsmallBold: {
    fontSize: 12,
    fontWeight: 700
  },
  small: {
    fontSize: 12,
    fontWeight: 500
  },
  largeMedium: {
    fontSize: 16,
    fontWeight: 500
  },
  largeBold: {
    fontSize: 16,
    fontWeight: 700
  },
  xlargeBold: {
    fontSize: 18,
    fontWeight: 700
  },
  xsmallMedium: {
    fontSize: 12,
    fontWeight: 500
  },
});
