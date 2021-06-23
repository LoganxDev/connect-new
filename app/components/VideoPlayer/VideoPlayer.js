import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';

import ImageButton from '../Util/ImageButton';
import PlayPauseButton from './PlayPauseButton';
import Seekbar from './Seekbar';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

export default VideoPlayer = ({notifyVideoHeight, videoUri, duration}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [paused, setPaused] = useState(false);
  const [videoHeight, setVideoHeight] = useState(310.5);
  const [videoWidth, setVideoWidth] = useState(375);
  const [distanceTop, setDistanceTop] = useState(120);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [controlsDisplayed, setControlsDisplayed] = useState(false);
  const hideControlTimeout = useRef(null);
  const videoPlayerRef = useRef(null).current;

  const toggleControls = () => {
    if (controlsDisplayed && hideControlTimeout.current) {
      clearTimeout(hideControlTimeout.current);
    }
    setControlsDisplayed(!controlsDisplayed);
  };

  const toggleFullscreen = () => {
    // force orientation change and lock it
    // animate to width being screen height and height being screen width

    // create a listener for orientation change and call this method
    if (isFullScreen) {
      Orientation.lockToPortrait();
      // Orientation.unlockAllOrientations();
    } else {
      Orientation.lockToLandscape();
      // Orientation.unlockAllOrientations();
    }
    setIsFullScreen(!isFullScreen);
  };

  const resetTimeout = () => {
    if (hideControlTimeout.current) {
      clearTimeout(hideControlTimeout.current);
    }
    hideControlTimeout.current = setTimeout(toggleControls, 5000);
  };

  const seekbarReleased = () => {
    resetTimeout();
  };

  const seekbarGranted = () => {
    if (hideControlTimeout.current) {
      clearTimeout(hideControlTimeout.current);
    }
  };

  const seek = (time) => {
    console.log('seek: ' + time)
    // if (videoPlayerRef) {
      videoPlayerRef?.seek(time);
      // onSeek(state?.currentTime);
      setCurrentTime(time)
    // }
  };

  const togglePlay = () => {
    if (controlsDisplayed) {
      setPaused(!paused);
      resetTimeout();
    }
  };

  const onOrientationDidChange = () => {
    console.log('orientation changed');
  };

  useEffect(() => {
    if (controlsDisplayed) {
      resetTimeout();
    }
  }, [controlsDisplayed]);

  useEffect(() => {
    notifyVideoHeight(videoHeight);
  }, [videoHeight]);

  useEffect(() => {
    if (isFullScreen) {
      setVideoWidth(screenHeight);
      setVideoHeight(screenWidth);
      setDistanceTop(0);
    } else {
      setVideoWidth(screenWidth);
      setVideoHeight((screenWidth * 3) / 4);
      setDistanceTop(120);
    }
  }, [isFullScreen]);

  useEffect(() => {
    setVideoHeight((screenWidth * 3) / 4);
    Orientation.addOrientationListener(onOrientationDidChange);
    Orientation.unlockAllOrientations();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={toggleControls}>
      {videoUri !== undefined && videoUri !== '' ? (
        <View
          style={[
            styles.videoContainer,
            {top: distanceTop, width: videoWidth, height: videoHeight},
          ]}>
          <Video
            style={styles.video}
            source={{uri: videoUri}}
            currentTime={currentTime}
            durationHint={Math.floor(duration / 1000)}
            muted={true}
            ref={videoPlayerRef}
            // touchDisabled={ this.state.pipPrimary !== 'video' }
            // onBuffer={ () => this.setState({ videoBuffering: true }) }
            // onPause={  () => this.setState({ videoBuffering: false }) }
            onSeek={(time) => setCurrentTime(time)}
            // onProgress={ (progress) => {
            //   let state = { currentTime: progress.currentTime, playableDuration: progress.playableDuration };
            //   if (progress.playableDuration > 0) {
            //     state.videoBuffering = false;
            //   }
            //   this.setState(state);
            // } }
            // onError={ (e) => console.error(e ) }
            controls={false}
            progressUpdateInterval={500}
            resizeMode="contain"
            repeat={false}
            disableVolume={true}
            // disablePlayPause={ this.state.pipPrimary !== 'video' }
            // disableSeekbar={ this.state.pipPrimary !== 'video' }
            // disableTimer={ this.state.pipPrimary !== 'video' }
            paused={paused}
          />
          {controlsDisplayed && (
            <View style={styles.controls}>
              {/* <View style={styles.topControls}></View> */}
              <View style={styles.centerControls}>
                {/* <ImageButton image={require('../../assets/')} onPress={skipBack} /> */}
                <PlayPauseButton
                  isPaused={paused}
                  onPress={togglePlay}></PlayPauseButton>
                {/* <ImageButton image={null} onPress={skipForward} /> */}
              </View>
              <View style={styles.bottomControls}>
                <ImageButton
                  width={12}
                  height={12}
                  image={
                    isFullScreen
                      ? require('../../assets/shrink.png')
                      : require('../../assets/expand.png')
                  }
                  onPress={toggleFullscreen}
                />
              </View>
            </View>
          )}
          <Seekbar
            granted={seekbarGranted}
            released={seekbarReleased}
            seek={seek}
            duration={duration}
          />
        </View>
      ) : (
        <></>
      )}
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    overflow: 'hidden',
    backgroundColor: '#000',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  centerControls: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  bottomControls: {
    alignItems: 'flex-end',
    paddingBottom: 60,
    paddingRight: '5%',
  },
  seekbarContainer: {
    alignSelf: 'stretch',
    height: 28,
    marginLeft: 40,
    marginRight: 40,
  },
  seekbarTrack: {
    backgroundColor: '#333',
    height: 1,
    position: 'relative',
    top: 14,
    width: '100%',
  },
  seekbarFill: {
    backgroundColor: '#FFF',
    height: 1,
    width: '100%',
  },
  seekbarHandle: {
    position: 'absolute',
    marginLeft: -7,
    height: 28,
    width: 28,
  },
});
