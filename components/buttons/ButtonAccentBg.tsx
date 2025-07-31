import { Dimensions, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import { ThemedText } from '../ThemedText';

const ButtonAccentBg = ({text, handlePress, additionalStyle, isLoading, isDisabled} : {text : any, handlePress: any, additionalStyle : any, isLoading:any, isDisabled: any}) => {
    return (
        <TouchableOpacity style = {[styles(isLoading, isDisabled).btnContainer, {...additionalStyle}]} onPress={handlePress} disabled={isLoading || isDisabled}>
            <ThemedText type='mediumMedium' style={[styles().buttonTextStyle, {marginHorizontal:10}]}>{text}</ThemedText>
            { isLoading && <ActivityIndicator size='small' color="#ffffff" />}
        </TouchableOpacity>
    );
};

const styles = (isLoading? : any, isDisabled? : any) => 
    StyleSheet.create({
        btnContainer: {
            height: 45,
            backgroundColor: isLoading || isDisabled ? 'rgba(0, 116, 186, 0.3)' : "#0074BA",
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: 'row',
        },
        buttonTextStyle : {
            color: "#FFFFFF",
            fontSize: 16,
            fontWeight: 700
        },
    });


export default ButtonAccentBg;