import { Dimensions, Image, TouchableOpacity } from 'react-native';
import { COLORS , SIZES } from '../../constants/constants';
import { StyleSheet } from 'react-native';

const ButtonTransBg = ({iconUrl, dimension, handlePress} : {iconUrl : any, dimension: any, handlePress: any}) => {
    return (
        <TouchableOpacity style = {styles().btnContainer} onPress={handlePress}>
            <Image 
                source={iconUrl}
                style={styles(dimension).btnImg}
            />
        </TouchableOpacity>
    );
};

const styles = (dimension? : any) => 
    StyleSheet.create({
        btnContainer: {
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center", 
        },
        btnImg: {
            width : dimension,
            height: dimension,
            resizeMode: 'contain'
    
        }
    });


export default ButtonTransBg;