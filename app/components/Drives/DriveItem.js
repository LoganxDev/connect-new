import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

// import { geocodeRoute } from '../../../actions/Drives';
import {getRouteStartImage} from '../../actions/Drives';

const screenWidth = Dimensions.get('screen').width;

const DriveItem = (props) => {
  const [imageWidth, setImageWidth] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [startTime] = useState(props.drive.startTime);
  const [endTime, setEndTime] = useState(0);
  const [duration] = useState(props.drive.duration);
  const navigation = useNavigation();

  useEffect(() => {
    setImageUrl(props.drive.url + '/0/sprite.jpg');
    Image.getSize(props.drive.url + '/0/sprite.jpg', (w, h) => {
      setImageWidth(w);
    });
  }, [props.drive.url]);

  useEffect(() => {
    setEndTime(startTime + duration);
  }, [startTime, duration]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate('DrivePlayback', {drive: props.drive})
      }>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', paddingLeft: 20}}>
          {imageWidth > 0 ? (
            <View
              style={{
                width: 128,
                height: 96,
                backgroundColor: '#000',
                overflow: 'hidden',
                borderRadius: 10,
              }}>
              <Image
                source={{uri: imageUrl}}
                style={[{width: imageWidth}, styles.thumbImg]}
              />
            </View>
          ) : (
            <Text style={styles.text}>No Image</Text>
          )}
          <View
            style={{justifyContent: 'center', paddingLeft: 30, height: 100}}>
            <Text style={[styles.text, {fontWeight: '900', marginBottom: 5}]}>
              {moment(startTime).format('ll')}
            </Text>
            <Text style={[styles.text, {fontWeight: '600'}]}>
              {`${moment(startTime).format('LT')} - `}
              {moment(startTime + duration).format('LT')}
            </Text>
          </View>
        </View>
        <View style={styles.waypoints}>
          {/* <View style={ styles.waypointsHeader }>
            <Text
              color='white'
              size='medium'
              weight='semibold'>
              { moment(endTime).format('dddd, MMMM Do') }
            </Text>
          </View>
          <View style={ styles.waypointsBody }>
            <View style={ styles.waypointsArt }>
              <View style={ styles.waypoint }>
              </View>
              <View style={ styles.waypointsLine } />
              <View style={ [styles.waypoint, styles.waypointB] }>
              </View>
            </View>
            <View style={ styles.waypointsItems }>
              <View style={ styles.waypointsItem }>
                <View style={ styles.waypointsItemLocation }>
                  <Text
                    color='white'
                    size='small'>
                    { geocodes.start ?
                        `${ geocodes.start.streetAddress }, ${ "\n" }${ geocodes.start.locality }, ${ geocodes.start.region } ${ geocodes.start.zipCode }`
                        : null }
                  </Text>
                </View>
              </View>
              <View style={ styles.waypointsItem }>
                <View style={ styles.waypointsItemLocation }>
                  <X.Text
                    color='white'
                    size='small'>
                    { geocodes.end
                        ? `${ geocodes.end.streetAddress }, ${ "\n" }${ geocodes.end.locality },  ${ geocodes.end.region } ${ geocodes.end.zipCode }`
                        : null }
                  </X.Text>
                </View>
              </View>
            </View>
          </View> */}
          {/* <Text style={styles.waypoint}>Waypoints go here</Text>
          <Text style={styles.waypoint}>Maybe options too?</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    height: 130,
  },
  thumbImg: {
    height: 96,
    position: 'absolute',
    top: 0,
    left: -128,
  },
  text: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 20,
  },
  waypoints: {
    marginLeft: 20,
    // marginTop: 10,
  },
  waypoint: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '300',
  },
});

export default DriveItem;
