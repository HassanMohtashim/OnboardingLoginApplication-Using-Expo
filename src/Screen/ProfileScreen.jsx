import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error clearing user data', error);
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View>
          <Text style={styles.headerText}>Profile</Text>
          <Image
            source={require("../../assets/user.png")}
            style={styles.profileImage}
          />
          <Text style={styles.label}>Full Name:</Text>
          <Text style={styles.value}>{user.fullName}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email}</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.noDataText}>No user data available</Text>
      )}
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
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#0020C2',
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  profileImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  noDataText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ProfileScreen;