import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";


const Splash = () => {
    const navigation = useNavigation();
    useEffect(() =>{
        const timer = setTimeout(()=>{
            console.log("Navigating to Onboarding...");
            navigation.navigate("Onboarding")
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigation]);
    return(
        <View style={styles.container}>
            <Image style={styles.image} source={require("../../assets/world.png")}/>
            <Text style={styles.text}>TripIt</Text>
            <Text style={styles.textSlang}>Explore the world with us!</Text>
        </View>
    )
}

export default Splash
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"white",
    },
    image:{
        width:120,
        height:120,
        marginBottom:20,
    },
    text:{
        fontSize:20,
        fontWeight:"bold",
        letterSpacing:1.2,
        color:"#0020C2",
    },
    textSlang:{
        marginTop:50,
        fontSize:15,
        fontWeight:"bold",
        letterSpacing:1.8,
        color:"#0020C2",
    },
})