import { View, Image, StyleSheet, Text, SafeAreaView, FlatList, Pressable } from 'react-native';
import Colors from './Themes/colors';
import Song from './components/Song.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './components/MainScreen.js';
import DetailedSongScreen from './components/DetailedSongScreen.js';
import SongPreviewScreen from './components/SongPreviewScreen.js';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Main Screen" component={MainScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Detailed Song Screen" component={DetailedSongScreen} 
                options={{headerStyle: {backgroundColor: Colors.background}, headerTitleStyle: {color: 'white'}}}/>
                <Stack.Screen name="Song Preview Screen" component={SongPreviewScreen} 
                options={{headerStyle: {backgroundColor: Colors.background}, headerTitleStyle: {color: 'white'}}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
});
