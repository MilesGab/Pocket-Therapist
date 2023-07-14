import React, { useEffect, useState } from 'react';
import { DeviceMotion } from 'expo-sensors';
import { Button, Text, View } from 'react-native';

const Sense = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    let subscription;
    const subscribeToRotationUpdates = async () => {
      DeviceMotion.setUpdateInterval(100); // Set the update interval (in milliseconds)

      subscription = DeviceMotion.addListener(({ rotation }) => {
        if (!isResetting) {
          setRotation({
            x: toDegrees(rotation.alpha).toFixed(0),
            y: toDegrees(rotation.beta).toFixed(2),
            z: toDegrees(rotation.gamma).toFixed(2),
          });
        }
      });

      await DeviceMotion.start();
    };

    subscribeToRotationUpdates();

    return () => {
      if (subscription) {
        subscription.remove();
      }
      DeviceMotion.stop();
      setIsResetting(false); // Reset the resetting state to false on unmount
    };
  }, [isResetting]);

  const toDegrees = (radians) => {
    return (radians * 180) / Math.PI;
  };

  const resetRotation = () => {
    setIsResetting(true);
    setRotation({ x: 0, y: 0, z: 0 });

    setTimeout(() => {
      setIsResetting(false);
    }, 500);
  };

  return (
    <View>
      <Text>Wrist: {rotation.x}°</Text>
      <Button title="Reset" onPress={resetRotation} />
    </View>
  );
};

export default Sense;