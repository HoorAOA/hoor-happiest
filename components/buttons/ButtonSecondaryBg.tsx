import { Dimensions, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import { ThemedText } from '../ThemedText';

const ButtonSecondaryBg = ({text, handlePress, additionalStyle, isLoading} : {text : any, handlePress: any, additionalStyle : any, isLoading:any}) => {
    return (
        <TouchableOpacity style = {[styles(isLoading).btnContainer, {...additionalStyle}]} onPress={handlePress} disabled={isLoading}>
            <ThemedText type='mediumMedium' style={[styles().buttonTextStyle, {marginHorizontal:10}]}>{text}</ThemedText>
            { isLoading && <ActivityIndicator size='small' color="#ffffff" />}
        </TouchableOpacity>
    );
};

const styles = (isLoading? : any) => 
    StyleSheet.create({
        btnContainer: {
            height: 45,
            backgroundColor: isLoading ? 'rgba(0, 116, 186, 0.3)' : "#DBF2FF",
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: 'row',
        },
        buttonTextStyle : {
            color: "#0074BA",
            fontSize: 16,
            fontWeight: 700
        },
    });


export default ButtonSecondaryBg;