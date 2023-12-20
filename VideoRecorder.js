// VideoRecorder.js
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

const VideoRecorder = () => {
  const cameraRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const askPermissions = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.AUDIO);
      if (status !== 'granted') {
        console.error('Camera and audio recording permissions are required!');
      }
    };

    askPermissions();
  }, []);

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        const { status } = await Permissions.getAsync(Permissions.AUDIO);
        if (status === 'granted') {
          const { uri } = await cameraRef.current.recordAsync();
          console.log(uri);
        } else {
          console.error('Audio recording permission not granted!');
        }
      } catch (error) {
        console.error("Error recording video: ", error);
      }
    }
  };

  const stopRecording = () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        ref={cameraRef}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => (isRecording ? stopRecording() : startRecording())}
            style={{
              padding: 20,
              backgroundColor: isRecording ? 'red' : 'green',
              borderRadius: 10,
            }}
          >
            <Text style={{ color: 'white' }}>{isRecording ? 'Stop Recording' : 'Start Recording'}</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default VideoRecorder;
