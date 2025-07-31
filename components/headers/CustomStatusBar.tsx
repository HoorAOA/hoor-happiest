import { StyleSheet, Image, View, type ViewProps } from 'react-native';
import { useThemeColor } from '../../hooks/colorHooks/useThemeColor';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { StatusBar, SafeAreaView } from 'react-native';
import { CustomStatusBarProps } from '../../constants/types';

export const CustomStatusBar = ({ backgroundColor, ...props } : CustomStatusBarProps) => {
  return (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
         <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  centerViewContent: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    paddingHorizontal: 16,
    height: 64,
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  statusBar: {
    height: StatusBar.currentHeight,
},
});