/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const ProgressBar = (props) => {
  const { index, currentIndex, duration, length, active } = props;
  const [pauseTime, setPauseTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const scale = useRef(new Animated.Value(0)).current;
  const [width, setWidth] = useState(0);

  const onLayoutAdded = (evt) => {
    setWidth(evt.width);
  };

  useEffect(() => {
    switch (active) {
      case 2:
        return scale.setValue(width);
      case 1:
        return props.isLoaded && !props.isNewStory ? Animated.timing(scale, {
          toValue: width,
          duration: getDuration() ,
          easing: Easing.linear,
          useNativeDriver:false
        }).start(({ finished }) => {
          if (finished) props.next();
        })
          : scale.setValue(0);
      case 0:
        return scale.setValue(0);
      default:
        return scale.setValue(0);
    }
  });

  const getDuration = () => {
    const totalPlaytime = 10 * 1000;

    if (props.pause) {
   //   console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv1')
      return 50000;
    }

    if (pauseTime === null) {
    //  console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv2')

      return totalPlaytime;
    }

    const lastTime = pauseTime - startTime;
   // console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv3')

    return totalPlaytime - lastTime;
  };

  useEffect(() => {
    if (index === currentIndex) {
      if (props.pause) {
        const endtime = Date.now();
      //  console.log('endtime', endtime);
        setPauseTime(endtime);
      }

      if (startTime === null) {
        setStartTime(Date.now());
      }
    }
  }, [props.pause]);


  return (
    <View onLayout={evt => onLayoutAdded(evt.nativeEvent.layout)}
      style={{
      height: 2,
      flex: 1,
      backgroundColor: '#555',
      margin: 2,
    }}>
      <Animated.View style={{
        width: scale,
        backgroundColor: index <= currentIndex ? 'white' : '#555',
        position: 'absolute',
        top: 0,
        margin: 0,      
          height: 2,
          flex: 1,
        
      }}
      />
    </View>
  );
};

ProgressBar.propTypes = ({
  index: PropTypes.number,
  currentIndex: PropTypes.number,
});



export default ProgressBar;
