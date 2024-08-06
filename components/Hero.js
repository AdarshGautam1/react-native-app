import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Hero = () => {
  return (
    <View style = {{alignItems: 'center', justifyContent: 'center'}}>
      <Image source={require('../images/hero.png')} style = {{
        width: 340,
        height: 400
      }} />
    </View>
  )
}

export default Hero

const styles = StyleSheet.create({})