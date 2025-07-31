import { StyleSheet, TextInput, View, Image, Platform, ImageBackground, TouchableOpacity, KeyboardAvoidingView, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import ButtonAccentBg from '../../components/buttons/ButtonAccentBg';
import { COLORS } from '../../constants/constants';
import images from '../../constants/Images';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { PropsLogin } from '../../constants/types';
import Ionicons from '@react-native-vector-icons/ionicons';
import { CustomStatusBar } from '../../components/headers/CustomStatusBar';
import { connectToDatabase } from '../../db/db';
import { addSharedPreferencesHandler } from '../../db/sharedPreferencesHandler';
import UserPreference from '../../data/UserPreference';
import Images from '../../constants/Images';

export default function LoginScreen({ navigation }: PropsLogin) {
  const [isLoadingLogin, setLoadingLogin] = useState(false);

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    setLoadingLogin(true);
      const db = await connectToDatabase()

      // hardcoded data
      const addFunctionality = await addSharedPreferencesHandler(db
          , [ new UserPreference('userName', "Mohammed Ali")
          , new UserPreference('email', "Johndoe@wxample.com")
          , new UserPreference('mobile', "050 xxx xxxx")
        ]);
        
      setLoadingLogin(false);

      redirectToNextScreen()
  }

  const redirectToNextScreen = async () => {
    // navigation.replace('Drawer')
  };


  const [userNameValidationMessage, setUserNameValidationMessage] = useState("Username cannot be empty");
  const [passwordValidationMessage, setPasswordValidationMessage] = useState("password cannot be empty");
  const [isValidUserName, setIsValidUserName] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const validateUsername = (text: string) => {
    const usernameRegex = /^[\p{L}\p{N}.]{0,16}$/u;
    const noWhiteSpaces = text.replace(" ", "")

    if (noWhiteSpaces == "") {
      setUserNameValidationMessage('Username cannot be empty');
      setIsValidUserName(false)
    } else if (!usernameRegex.test(noWhiteSpaces)) {
      setUserNameValidationMessage('Only letters, numbers and . are allowed');
      setIsValidUserName(false)
    } else if (noWhiteSpaces.length > 16) {
      setUserNameValidationMessage('Maximum 16 characters allowed');
      setIsValidUserName(false)
    } else if (noWhiteSpaces.length > 0 && noWhiteSpaces.length < 3) {
      setUserNameValidationMessage('Minimum 3 characters required');
      setIsValidUserName(false)
    } else {
      setIsValidUserName(true)
    }

    setUserName(text)
  };

  const validatePassword = (text: string) => {
    const noWhiteSpaces = text.replace(" ", "")

    if (noWhiteSpaces.length > 16) {
      setPasswordValidationMessage('Maximum 16 characters allowed');
      setIsValidPassword(false)
    } else if (noWhiteSpaces.length > 0 && noWhiteSpaces.length < 3) {
      setPasswordValidationMessage('Minimum 3 characters required');
      setIsValidPassword(false)
    } else if (noWhiteSpaces == "") {
      setPasswordValidationMessage('Password cannot be empty');
      setIsValidPassword(false)
    } else {
      setIsValidPassword(true)
    }

    setPassword(text)
  };

  const lastNameRef = useRef<TextInput>(null);

  return (
    <>
      <CustomStatusBar backgroundColor="#000000" barStyle="light-content" />
      <ImageBackground source={images.ic_gradient_background} resizeMode="cover" style={styles.mainAreaStyle}>

        {/* <ThemedView style={styles.scrollViewStyle}> */}
        <KeyboardAvoidingView
          style={{ flex: 1, width: '100%' }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={styles.scrollViewStyle2}
              keyboardShouldPersistTaps="handled"
            >
              <View style={{ height: 200}} />
               <ThemedText style={{fontSize: 28, color: '#FFFFFF'}}>Login</ThemedText> 

              <View style={styles.innerContainer}>
                <View style={styles.formContainer}>
                  <View style={isValidUserName ? styles.inputContainer : styles.invalidInputContainer}>
                    <Ionicons name="person" size={20} color={"#0074BA"} />
                    <TextInput
                      style={styles.input}
                      value={userName}
                      onChangeText={(text) => validateUsername(text)}
                      placeholder='Username'
                      placeholderTextColor="#888"
                      keyboardType='default'
                      returnKeyType="next"
                      textAlign='left'
                      onSubmitEditing={() => lastNameRef.current?.focus()}
                    />
                  </View>
                  {!isValidUserName && <ThemedText style={styles.errorMessageStyle}>{userNameValidationMessage}</ThemedText>}
                  <ThemedView style={styles.gabViewStyle7} />
                  <View style={isValidPassword ? styles.inputContainer : styles.invalidInputContainer}>
                    <Ionicons name="lock-closed" size={20} color={"#0074BA"} />
                    <TextInput
                      style={styles.input}
                      value={password}
                      ref={lastNameRef}
                      onChangeText={(text) => validatePassword(text)}
                      placeholder='Password'
                      placeholderTextColor="#888"
                      returnKeyType="done"
                      secureTextEntry={true}
                      textAlign='left'
                      onSubmitEditing={() => handleLogin()}
                    />
                  </View>
                  {!isValidPassword && <ThemedText style={styles.errorMessageStyle}>{passwordValidationMessage}</ThemedText>}
                  <ThemedView style={{height: 20}} />
                  <ButtonAccentBg {...{ text: "Login", handlePress: () => { handleLogin()  }, isLoading: isLoadingLogin, isDisabled: !isValidUserName || !isValidPassword , additionalStyle: { width: '100%' } }} />
                </View>
              </View>
              <ThemedView style={styles.gabViewStyle50} />
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ImageBackground>
    </>
  );

}

const styles = StyleSheet.create({
  floatingImage: {
    height: 80,
    width: 80,
    transform: [{ translateY: 80 }],
    zIndex: 999
  },
  scrollViewStyle: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
  scrollViewStyle2: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 25,
    backgroundColor: 'transparent',
    height: '100%'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#AAAAAA',
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    height: 45,
    paddingHorizontal: 16
  },
  invalidInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F25E5E',
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    height: 45,
    paddingHorizontal: 16
  },
  imageStyle: {
    resizeMode: 'contain',
    maxWidth: 250,
    minWidth: '70%',
    alignContent: 'center',
    marginTop: 20
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000000'
  },
  innerContainer: {
    width: '100%',
    marginTop: 35,
    paddingHorizontal: 16,
    paddingBottom: 25,
    paddingTop: 35,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderColor: '#CFC3C3',
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1939',
    textAlign: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 12,
    marginStart: 12,
    fontWeight: 500,
  },
  formContainer: {
    width: '90%',
  },
  checkbox: {
    marginRight: 10,
  },
  gabViewStyle7: {
    height: 7,
    backgroundColor: 'transparent'
  },
  gabViewStyle50: {
    height: 35,
    backgroundColor: 'transparent'
  },
  mainAreaStyle: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center'
  },
  versionTextStyle: {
    fontSize: 12,
    fontWeight: 500,
    textAlign: 'center',
    color: "#FFFFFF",
  },
  errorMessageStyle: {
    fontSize: 12,
    fontWeight: 500,
    color: '#F25E5E',
  },
  icon: {
    marginRight: 8,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 10,
  },
});
