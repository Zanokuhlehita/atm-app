/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
// import Image from 'react-native-scalable-image';
import PropTypes from 'prop-types';
import { Text } from 'native-base';


const Story = (props) => {
  const { story } = props;
  const { url, type, line } = story || {};

  return (
    <View style={styles.container}>
     
        <Image
          source={{ uri: url }}
          onLoadEnd={props.onImageLoaded}
          style={styles.content}
          resizeMode="stretch"
          // width={ScreenWidth}
      />
      <View style={{
        position: 'absolute',
        paddingHorizontal:30
      }}>
        <Text
          style={{
            fontSize: 40,
            textAlign: 'center',
            color:'white'
        }}
        >{line}</Text>

      </View>
    </View>
  );
};

Story.propTypes = {
  story: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: { width: '100%',
    height: '100%',
    flex: 1,
  },
  imageContent: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  loading: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default Story;
