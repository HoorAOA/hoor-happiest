import { StyleSheet, Image, View, type ViewProps } from 'react-native';
import { useThemeColor } from '../../hooks/colorHooks/useThemeColor';
import ButtonTransBg from '../buttons/ButtonTransBg';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';

export const ThemedHeader = ({ firstButtonProps, iconProps, textHeaderProps } : {firstButtonProps : any, iconProps : any, textHeaderProps : any} ) => {
  return (
    <ThemedView style={styles.container} >
      <ButtonTransBg {...firstButtonProps} />
      <View style={styles.centerViewContent}>
        {iconProps && <Image {...iconProps} />}
        {textHeaderProps && <ThemedText style={{textAlign: 'center'}} type='largeBold' {...textHeaderProps}>{textHeaderProps.text}</ThemedText>}
      </View>
      <View style={{width: 40}}/>
    </ThemedView>
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
    backgroundColor: '#60636a12'
  }
});