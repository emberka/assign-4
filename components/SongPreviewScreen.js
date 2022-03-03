// JavaScript source code
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';
import Colors from '../Themes/colors';

export default function SongPreviewScreen({ navigation, route}) {
    const {songprev_link} = route.params;
    return <WebView source={{uri: songprev_link}}/>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})