import { Dimensions, Image, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { ThemedText } from '../ThemedText';

const ButtonGrayBgSmall = ({text, handlePress, additionalStyle, icon} : {text : any, handlePress: any, additionalStyle : any, icon?: any}) => {
    return (
        <TouchableOpacity style = {[styles().btnContainer, {...additionalStyle}]} onPress={handlePress}>
            <ThemedText type='mediumBold' style={[styles().buttonTextStyle, {marginEnd:10}]}>{text}</ThemedText>
            {icon && <Image source={icon} style={{height: 18, width: 18, resizeMode: 'contain'}}/>}
        </TouchableOpacity>
    );
};

const styles = (dimension? : any) => 
    StyleSheet.create({
        btnContainer: {
            height: 35,
            backgroundColor: "#F5F5F5",
            borderRadius: 6 ,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: 'row',
            paddingHorizontal: 12,
            paddingVertical: 7
        },
        buttonTextStyle : {
            color: "#11181C",
            fontSize: 12,
            fontWeight: 700
        },
    });


export default ButtonGrayBgSmall;