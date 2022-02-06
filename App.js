import { View, Image, StyleSheet, Text, SafeAreaView, FlatList, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { myTopTracks, albumTracks } from "./utils/apiOptions";
import { REDIRECT_URI, SCOPES, CLIENT_ID, ALBUM_ID } from "./utils/constants";
import Colors from "./Themes/colors"
import millisToMinutesAndSeconds from "./utils/millisToMinuteSeconds"
import Song from './components/Song.js'

// Endpoints for authorizing with Spotify
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token"
};

export default function App() {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      scopes: SCOPES,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: REDIRECT_URI
    },
    discovery
  );
  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
    }
  }, [response]);

  useEffect(() => {
    const fetchTracks = async () => {
      // TODO: Comment out which one you don't want to use
      // myTopTracks or albumTracks

      //const res = await myTopTracks(token);
      const res = await albumTracks(ALBUM_ID, token);
      setTracks(res);
    };
    if (token) {
      // Authenticated, make API request
      fetchTracks();
    }
  }, [token]);

  const SpotifyAuthButton = () => {
    return (
        <Pressable
            onPress={promptAsync}
            style={({ pressed }) => [
            {
                backgroundColor: pressed
                ? '#1aa44a'
                : Colors.spotify
            },
            styles.authButton
            ]}>       
            <View style={styles.authButton}>
                <Image style={styles.icon} source={require('./assets/spotify-logo.png')}/>
                <Text style={styles.text}> CONNECT WITH SPOTIFY </Text>
            </View>  
        </Pressable>
	);
  }
  const SongsList = () => {
    return(
        <View>
            <View style={styles.topBar}>
                <Image style={styles.biggerIcon} source={require('./assets/spotify-logo.png')} />
                <Text style={styles.topText}>My Top Tracks</Text>
            </View>
            <FlatList
                data={tracks}
                renderItem={({item, index}) => renderSong(item, index)}
                keyExtractor={(item) => item.index} />
        </View>
    );
  }

  const renderSong = (item, index) => (
    <Song
        index={index}
        cover={item.album.images[0].url}
        title={item.name}
        artist={item.artists[0].name}
        album={item.album.name}
        duration={millisToMinutesAndSeconds(item.duration_ms)}
    />
  );

  let contentDisplayed = null;

  if (token) {
        //contentDisplayed = <FlatList/>
        contentDisplayed = <SongsList/>
  } else {
        contentDisplayed = <SpotifyAuthButton/>
  }

  return (
    <SafeAreaView style={styles.container}>
      {contentDisplayed}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  authButton: {
    borderRadius: 99999,
    padding: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    height: 15,
    width: 15,
    marginLeft: 5
  },
  text: {
    color: 'white',
    fontSize: 14,
    marginLeft: 5
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  biggerIcon: {
    height: 22,
    width: 22, 
    marginLeft: 5,
    marginTop: 15
  },
  topText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
    marginTop: 15
  }
});
