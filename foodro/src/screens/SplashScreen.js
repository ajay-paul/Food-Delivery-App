import React, { useEffect } from 'react';
import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import {colors, Images, Fonts} from '../constants';
import {Display} from '../utils';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(()=>{
      navigation.navigate('Welcome')
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" 
       backgroundColor={colors.DEFAULT_GREEN}
       translucent/>
      <Image source={Images.PLATE} resizeMode="contain" style={styles.image} />
      <Text style={styles.titleText}>FooDro</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.DEFAULT_GREEN,
    
  },
  image: {
    height: Display.setHeight(30),
    width: Display.setWidth(60),
  },
  titleText: {
    color: colors.DEFAULT_WHITE,
    fontSize: 32,
    fontFamily: Fonts.POPPINS_THIN,
  },
});

export default SplashScreen;