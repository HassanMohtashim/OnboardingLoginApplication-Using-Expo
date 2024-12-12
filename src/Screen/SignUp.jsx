import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().min(3, 'Full Name must be at least 3 characters').required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const SignUpScreen = () => {
  const navigation = useNavigation();

  const handleSignUp = async (values) => {
    try {
      const userData = {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      };
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error saving user data', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Create a new Account</Text>
      <Image
        source={require("../../assets/signup.png")} // Replace with your image URL or local image path
        style={styles.image}
      />
      <Formik
        initialValues={{ fullName: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSignUp(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
          <View>
            <Input
              placeholder="Full Name"
              leftIcon={{ type: 'font-awesome', name: 'user', color: '#0020C2' }}
              onChangeText={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              value={values.fullName}
              errorMessage={touched.fullName && errors.fullName ? errors.fullName : ''}
            />
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
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              errorMessage={touched.password && errors.password ? errors.password : ''}
            />
            <Input
              placeholder="Confirm Password"
              leftIcon={{ type: 'font-awesome', name: 'lock', color: '#0020C2' }}
              secureTextEntry
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              errorMessage={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ''}
            />
            <Button
              title="Signup"
              onPress={handleSubmit}
              disabled={!isValid}
              buttonStyle={styles.signupButton}
              titleStyle={styles.signupButtonText}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkText}>Already have an account?</Text>
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  signupButton: {
    backgroundColor: '#0020C2',
    borderRadius: 10,
    paddingVertical: 10,
  },
  signupButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  linkText: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default SignUpScreen;