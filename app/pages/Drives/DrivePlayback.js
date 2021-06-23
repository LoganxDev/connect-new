import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import * as videoApi from '../../api/video';

import BasePage from '../Util/BasePage';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import DriveOverviewMap from '../../components/Drives/DriveOverviewMap';

export default DrivePlayback = (props) => {
  const route = useState(props.route);
  const [videoUri, setVideoUri] = useState(null);
  const [videoHeight, setVideoHeight] = useState(null);
  const [drive, setDrive] = useState({});

  useEffect(() => {
    setDrive(route[0].params.drive);
  }, [route]);

  useEffect(() => {
    setVideoUri(videoApi.getQcameraStreamIndexUrl(drive.url));
  }, [drive]);

  return (
    <BasePage title="Drive Playback">
      <VideoPlayer notifyVideoHeight={videoHeight => {setVideoHeight(videoHeight)}} videoUri={videoUri} duration={drive.duration}></VideoPlayer>
      {/* <View style={{height: 400, marginTop: videoHeight + 20}}>
        <Text style={{fontSize: 30, color: '#fff'}}>Testing!</Text>
      </View> */}
      <DriveOverviewMap></DriveOverviewMap>
    </BasePage>
  );
};
