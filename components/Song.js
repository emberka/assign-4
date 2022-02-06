// JavaScript source code
import { StyleSheet, Text, View, Image} from 'react-native';
import React, { useState } from "react";
import Colors from "../Themes/colors"

export default function Song({index, cover, title, artist, album, duration}) {
	return (
        <View style={styles.song}>
            <Text style={styles.index}>{index}</Text>
            <Image style={styles.cover} source={image}/>
            <View style={styles.titlesWrap}>
                <Text numberOfLines={1} style={styles.text}>{title}</Text>
                <Text numberOfLines={1} style={styles.subText}>{artist}</Text>
            </View>
            <View style={styles.albumName} >
                <Text numberOfLines={1} style={styles.text}>{album}</Text>
            </View>
            <View style={styles.duration}>
                <Text numberOfLines={1} style={styles.text}>{duration}</Text>
            </View>
        </View>
	);
}

const styles = StyleSheet.create({
    song: {
        flex: 1, 
        flexDirection: 'row',
        margin: 5
    }, 
    text: {
        color: 'white'
    },
    subText: {
        color: Colors.gray
    },
    index: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '5%'
    },
    cover: {
        margin: 5, 
        width: '15%'
    },
    titlesWrap: {
        justifyContent: 'center',
        alignItems: "center",
        margin: 5,
        width: '35%'
    },
    albumName: {
        color: 'white',
        justifyContent: 'center',
        alignItems: "center",
        width: '20%'
    },
    duration: {
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center', 
        margin: 5,
        width: "25%"
    }
});