import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
    SplashScreen,
    WelcomeScreen,
    SigninScreen,
    SignupScreen,
    ForgotPasswordScreen,
    RegisterPhoneScreen,
    VerificationScreen,
    HomeScreen
} from '../screens';
import {connect} from 'react-redux';
import { State } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const Navigators = ({token}) => {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {!token?(
                        <>
                        <Stack.Screen name='Splash' component={SplashScreen} />
                        <Stack.Screen name='Welcome' component={WelcomeScreen} />
                        <Stack.Screen name='Signin' component={SigninScreen} />
                        <Stack.Screen name='Signup' component={SignupScreen} />
                        <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
                        <Stack.Screen name='RegistrerPhone' component={RegisterPhoneScreen} />
                        <Stack.Screen name='Verification' component={VerificationScreen} />
                        </>

                    ) : (
                        <Stack.Screen name='Home' component={HomeScreen} />
                    
                )}
                
            </Stack.Navigator>
        </NavigationContainer>
    );
};
const mapStateToProps = (State) =>{
    return{
        token: State.generalState.token,
    };
};

export default connect(mapStateToProps)(Navigators);