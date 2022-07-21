import React, { useEffect } from 'react'
import {Text, View, StyleSheet} from 'react-native'

export const Home = ({navigation}) => {

  useEffect(() => {
    setTimeout( () => {
      navigation.navigate('Form')
    }, 1000)
  }, [])

  return (
    <View style={styles.view}>
      <Text style={styles.txt}>Navigation</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txt: {
    color: 'black',
    padding: 10,
    fontSize: 25,
  }
})