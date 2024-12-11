import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import StackN from './src/Nav/StackN';

export default function App() {
  return (
   <NavigationContainer>
    <StackN/>
   </NavigationContainer>
  );
}