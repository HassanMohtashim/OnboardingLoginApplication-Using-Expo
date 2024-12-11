import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width: screenWidth } = Dimensions.get('window');

const slides = [
  {
    id: "1",
    title: "Explore Your Next Adventure",
    description: "Discover destinations around the globe that match your interests. From scenic landscapes to bustling cities, we have it all.",
    image: require("../../assets/onboardingOneFinal.png"),
  },
  {
    id: "2",
    title: "Seamless Booking Made Easy",
    description: "Book flights, hotels, and activities in just a few taps. Enjoy secure payments and instant confirmation for a hassle-free experience.",
    image: require("../../assets/onboardingTwoFinal.png"),
  },
  {
    id: "3",
    title: "Personalized Recommendations",
    description: "Receive curated travel suggestions tailored to your preferences. Let us help you create unforgettable memories.",
    image: require("../../assets/onBoardingThreeFina.png"),
  },
];


const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate("Login");
    }
  };

  const handleSkip = () => {
    navigation.navigate("Login");
  };

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const renderItem = ({ item, index }) => (
    <View style={styles.slide}>
      {index < slides.length - 1 && (
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
          <Ionicons name="arrow-forward" size={20} color="#0020C2"/>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{item.title}</Text>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.description}>{item.description}</Text>
      {index === slides.length - 1 && (
        <TouchableOpacity style={styles.getStartedButton} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />
      <View style={styles.navigationControls}>
        {currentIndex < slides.length - 1 && (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextText}>Next </Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF"/>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  slide: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  skipButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  skipText: {
    color: '#0020C2',
    marginRight: 5,
  },
  getStartedButton: {
    marginTop: 30,
    padding: 12,
    backgroundColor: '#0020C2',
    borderRadius: 12,
  },
  getStartedText: {
    color: '#fff',
    fontSize: 16,
  },
  navigationControls: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  nextButton: {
    padding:10,
    backgroundColor: '#0020C2',
    borderRadius: 10,
    alignItems:"center",
    flexDirection: 'row',
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Onboarding;