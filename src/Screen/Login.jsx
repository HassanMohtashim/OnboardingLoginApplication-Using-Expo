import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome Back!</Text>
      <Image
        source={require("../../assets/loginF.png")} // Replace with your image URL
        style={styles.welcomeImage}
      />
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // Handle login logic here
          console.log(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <Input
              placeholder="Email"
              leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#0020C2' }}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              errorMessage={touched.email && errors.email ? errors.email : ''}
            />
            <Input
              placeholder="Password"
              leftIcon={{ type: 'font-awesome', name: 'lock', color: '#0020C2' }}
              rightIcon={
                <Icon
                  name={passwordVisible ? 'eye' : 'eye-slash'}
                  type='font-awesome'
                  color='#0020C2'
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
              secureTextEntry={!passwordVisible}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              errorMessage={touched.password && errors.password ? errors.password : ''}
            />
            <Button title="Login" onPress={handleSubmit} buttonStyle={styles.loginButton}
              titleStyle={styles.loginButtonText}/>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signupLinkText}>New to this? Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#0020C2',
    borderRadius: 10,
    paddingVertical: 10,
  },
  loginButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  linkText: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 10,
  },
  signupLinkText: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 25,
  },
});

export default LoginScreen;