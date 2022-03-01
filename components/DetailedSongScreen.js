// JavaScript source code
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';
import Colors from '../Themes/colors';

export default function DetailedSongScreen({ navigation, route}) {
    const detsong_link = route.params;
    return (
        <WebView source={{uri: detsong_link.url}}/>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})