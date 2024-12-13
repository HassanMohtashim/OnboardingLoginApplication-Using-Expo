import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import { Formik } from 'formik';

const validationSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(3, 'Full Name must be at least 3 characters'),
  email: yup
    .string()
    .email('Invalid email format'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters'),
});

const SettingsScreen = () => {
  const [initialValues, setInitialValues] = useState({ fullName: '', email: '', password: '' });
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setInitialValues(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async (values) => {
    try {
      const userData = await AsyncStorage.getItem('user');
      const parsedData = userData ? JSON.parse(userData) : {};
      const updatedData = {
        fullName: values.fullName || parsedData.fullName,
        email: values.email || parsedData.email,
        password: values.password || parsedData.password,
      };
      await AsyncStorage.setItem('user', JSON.stringify(updatedData));
      navigation.navigate('ProfileScreen');
    } catch (error) {
      console.error('Error updating user data', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Profile</Text>
      <Image
        source={require("../../assets/skills.png")} // Replace with your image URL or local asset
        style={styles.image}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleUpdate}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              onChangeText={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              value={values.fullName}
            />
            {touched.fullName && errors.fullName && (
              <Text style={styles.error}>{errors.fullName}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.homeButton]}
              onPress={() => navigation.navigate('ProfileScreen')}
            >
              <Text style={styles.buttonText}>Back to Profiles</Text>
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
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  form: {
    width: '100%',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0020C2',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  homeButton: {
    backgroundColor: '#555',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SettingsScreen;