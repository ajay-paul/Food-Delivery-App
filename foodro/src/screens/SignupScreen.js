import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import {colors, Fonts, Images} from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Separator} from '../components';
import {Display} from '../utils';
import { AuthenticationService } from '../services';
import LottieView from 'lottie-react-native';

const inputStyle = state => {
  switch (state) {
    case 'valid':
      return {
        ...styles.inputContainer,
        borderWidth: 1,
        borderColor: colors.SECONDARY_GREEN,
      };
    case 'invalid':
      return {
        ...styles.inputContainer,
        borderWidth: 1,
        borderColor: colors.DEFAULT_RED,
      };
    default:
      return styles.inputContainer;
  }
};

const showMarker = state => {
  switch (state) {
    case 'valid':
      return (
        <Ionicons
          name="checkmark-circle-outline"
          color={colors.SECONDARY_GREEN}
          size={18}
          style={{marginRight: 10}}
        />
      );
    case 'invalid':
      return (
        <Ionicons
          name="close-circle-outline"
          color={colors.SECONDARY_RED}
          size={18}
          style={{marginRight: 10}}
        />
      );
    default:
      return null;
  }
};
const SignupScreen = ({navigation}) =>{
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [errorColor, setErrorColor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [emailState, setEmailState] = useState('default');
  const [usernameState, setUsernameState] = useState('default');

  const register = () => {
    let user = {
      username,
      email,
      password,
    };
    console.log(user);
    setIsLoading(true);
    AuthenticationService.register(user).then(response => {
      console.log(response);
      setIsLoading(false);
      if (response?.status) {
        setErrorMessage(response?.message);
        setErrorColor(false);
      }
        if(response.message == "User registered successfully"){
          setErrorColor(true);
        }
    });
    //navigation.navigate('RegistrerPhone')
  };

  const checkUserExist = async (type, value) => {
    if (value?.length > 0) {
      AuthenticationService.checkUserExist(type, value).then(response => {
        if (response?.status) {
          type === 'email' && emailErrorMessage
            ? setEmailErrorMessage('')
            : null;

          type === 'username' && usernameErrorMessage
            ? setUsernameErrorMessage('')
            : null;
          type === 'email' ? setEmailState('valid') : null;
          type === 'username' ? setUsernameState('valid') : null;
        } else {
          type === 'email' ? setEmailErrorMessage(response?.message) : null;
          type === 'username'
            ? setUsernameErrorMessage(response?.message)
            : null;
          type === 'email' ? setEmailState('invalid') : null;
          type === 'username' ? setUsernameState('invalid') : null;
        }
      });
    }
  };

  return(
    <View style={styles.container}>
      <StatusBar
       barStyle="dark-content"
       backgroundColor={colors.DEFAULT_WHITE}
       translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-sharp"
          size={30}
          onPress={() => navigation.goBack()}
        />
       <Text style={styles.headerTitle}>Sign Up</Text>
      </View>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.content}>
        Enter your email, choose username and password
      </Text>
      <View style={inputStyle(usernameState)}>
        <View style={styles.inputSubContainer}>
          <Ionicons
            name="person"
            size={22}
            color={colors.DEFAULT_GREY}
            style={{marginRight: 10}}
          />
          <TextInput
            placeholder="Username"
            placeholderTextColor={colors.DEFAULT_GREY}
            selectionColor={colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={text => setUsername(text)}
            onEndEditing={({nativeEvent: {text}}) =>
            checkUserExist('username', text)
          }
          />
          {showMarker(usernameState)}
        </View>
      </View>
      <Text style={[styles.errorcheckMessage, {marginTop: Boolean(usernameErrorMessage)? 7 : 0},
             {marginBottom: Boolean(usernameErrorMessage)? 7 : 0}]}>
             {usernameErrorMessage}
             </Text>
      <View style={inputStyle(emailState)}>
        <View style={styles.inputSubContainer}>
          <Ionicons
            name="at"
            size={22}
            color={colors.DEFAULT_GREY}
            style={{marginRight: 10}}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor={colors.DEFAULT_GREY}
            selectionColor={colors.DEFAULT_GREY}
            style={styles.inputText}
            keyboardType="email-address"
            onChangeText={text => setEmail(text)}
            onEndEditing={({nativeEvent: {text}}) =>
            checkUserExist('email', text)
          }
          />
          {showMarker(emailState)}
        </View>
      </View>
      <Text style={[styles.errorcheckMessage, {marginTop: Boolean(emailErrorMessage)? 7 : 0},
            {marginBottom: Boolean(emailErrorMessage)? 7 : 0}]}>
            {emailErrorMessage}
            </Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={22}
            color={colors.DEFAULT_GREY}
            style={{marginRight: 10}}
          />
          <TextInput
            secureTextEntry={isPasswordShow ? false : true}
            placeholder="Password"
            placeholderTextColor={colors.DEFAULT_GREY}
            selectionColor={colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={text => setPassword(text)}
          />
          <Ionicons
            name={isPasswordShow ? 'eye-outline' : 'eye-off-outline'}
            size={22}
            color={colors.DEFAULT_GREY}
            style={{marginRight: 10}}
            onPress={() => setIsPasswordShow(!isPasswordShow)}
          />
        </View>
        </View>
        <Text style={[styles.errorMessage, {color: errorColor? colors.DEFAULT_GREEN : colors.DEFAULT_RED},
          {marginTop: Boolean(errorMessage)? 7 : 0}]}>
          {errorMessage}
          </Text>
        <TouchableOpacity 
        style={styles.signinButton}
        onPress={() => register()}>

          {isLoading ? (
           <LottieView source={Images.LOADING} autoPlay />
          ) : (
            <Text style={styles.signinButtonText}>Create Account</Text>
          )}
      </TouchableOpacity>
      <Text style={styles.orText}>OR</Text>
      <TouchableOpacity style={styles.facebookButton}>
        <View style={styles.socialButtonsContainer}>
          <View style={styles.signinButtonLogoContainer}>
            <Image source={Images.FACEBOOK} style={styles.signinButtonLogo} />
          </View>
          <Text style={styles.socialSigninButtonText}>
            Connect with Facebook
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton}>
        <View style={styles.socialButtonsContainer}>
          <View style={styles.signinButtonLogoContainer}>
            <Image source={Images.GOOGLE} style={styles.signinButtonLogo} />
          </View>
          <Text style={styles.socialSigninButtonText}>Connect with Google</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create ({
    container:{
        flex: 1,
        backgroundColor: colors.DEFAULT_WHITE,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
      },
      headerTitle: {
        fontSize: 20,
        fontFamily: 'Fonts.POPPINS_MEDIUM',
        fontWeight: 'bold',
        lineHeight: 20 * 1.4,
        width: Display.setWidth(80),
        textAlign: 'center',
      },
      title: {
        fontSize: 20,
        fontFamily: Fonts.POPPINS_MEDIUM,
        lineHeight: 20 * 1.4,
        marginTop: 50,
        marginBottom: 10,
        marginHorizontal: 20,
      },
      content: {
        fontSize: 20,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 20,
      },
      inputContainer: {
        backgroundColor: colors.LIGHT_GREY,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: colors.LIGHT_GREY2,
        justifyContent: 'center',
      },
      inputSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      inputText: {
        fontSize: 18,
        textAlignVertical: 'center',
        padding: 0,
        height: Display.setHeight(6),
        color: colors.DEFAULT_BLACK,
        flex: 1,
      },
      signinButton: {
        backgroundColor: colors.DEFAULT_GREEN,
        borderRadius: 8,
        marginHorizontal: 20,
        height: Display.setHeight(6),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },
      signinButtonText: {
        fontSize: 18,
        lineHeight: 18 * 1.4,
        color: colors.DEFAULT_WHITE,
        fontFamily: Fonts.POPPINS_MEDIUM,
      },
      orText: {
        fontSize: 15,
        lineHeight: 15 * 1.4,
        color: colors.DEFAULT_BLACK,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginLeft: 5,
        alignSelf: 'center',
        marginTop: 20,
      },
      facebookButton: {
        backgroundColor: colors.FABEBOOK_BLUE,
        paddingVertical: 15,
        marginHorizontal: 20,
        borderRadius: 8,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      googleButton: {
        backgroundColor: colors.GOOGLE_BLUE,
        paddingVertical: 15,
        marginHorizontal: 20,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
      },
      signinButtonLogo: {
    height: 18,
    width: 18,
  },
  signinButtonLogoContainer: {
    backgroundColor: colors.DEFAULT_WHITE,
    padding: 2,
    borderRadius: 3,
    position: 'absolute',
    left: 25,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  socialSigninButtonText: {
    color: colors.DEFAULT_WHITE,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  signinButtonLogo: {
    height: 18,
    width: 18,
  },
  signinButtonLogoContainer: {
    backgroundColor: colors.DEFAULT_WHITE,
    padding: 2,
    borderRadius: 3,
    position: 'absolute',
    left: 25,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  socialSigninButtonText: {
    color: colors.DEFAULT_WHITE,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  errorMessage: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginHorizontal: 20,
    marginVertical: 3,
  },
  errorcheckMessage: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    color: colors.DEFAULT_RED,
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginHorizontal: 20,
    marginVertical: 3,
  },
});

export default SignupScreen;