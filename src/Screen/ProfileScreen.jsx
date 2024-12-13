import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.centeredContainer}>
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
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate('SettingScreen')}
          >
            <Icon name="settings-outline" size={20} color="#fff" />
            <Text style={styles.settingsButtonText}>Settings</Text>
          </TouchableOpacity>
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
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    marginBottom: 10,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center",
    padding: 10,
    backgroundColor: '#0020c2',
    borderRadius: 5,
    marginTop: 20,
  },
  settingsButtonText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 10,
  },
  logoutButton: {
    padding: 10,
    backgroundColor: '#0020c2',
    borderRadius: 5,
    marginTop: 20,
  },
  logoutButtonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ProfileScreen;