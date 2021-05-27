import React from 'react';
import { StyleSheet, Image } from 'react-native';

function ImageIcon({ navigation, style, source, iconSize = 100 }) {
  const [size, setSize] = React.useState(iconSize);
  return (
    <Image
      style={[styles.image, style, { width: size, height: size }]}
      source={source}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});

export default ImageIcon;
