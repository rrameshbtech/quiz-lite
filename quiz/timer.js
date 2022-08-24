import React, { useState, useEffect } from 'react';
import { LinearProgress } from '@rneui/themed';
import { StyleSheet } from 'react-native';

export function Timer({ code, duration, onElapse, onTick }) {
  const durationInMs = duration * 1000;
  const [progress, setProgress] = useState(0);
  const [remaining, setRemaining] = useState(durationInMs);
  const [isRunning, setIsRunning] = useState(true);
  const currentTimerRef = React.useRef(null);

  useEffect(() => {
    setRemaining(durationInMs);
    setIsRunning(true);
    setProgress(0);
    if (currentTimerRef) {
      clearTimeout(currentTimerRef.current);
    }
  }, [code]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    if (remaining == 0) {
      setIsRunning(false);
      onElapse();
      return;
    }

    if (currentTimerRef) {
      clearTimeout(currentTimerRef.current);
    }
    currentTimerRef.current = setTimeout(() => {
      setRemaining(remaining - 10);
      onTick(durationInMs - remaining);
      setProgress((durationInMs - remaining) / durationInMs);
    }, 10);
  });

  function barColor() {
    const barColors = [
      '#0fc902',
      '#4bc902',
      '#8dc902',
      '#8dc902',
      '#bfc902',
      '#c9b802',
      '#c99b02',
      '#c97902',
      '#c95502',
      '#ff0000',
    ];
    return barColors[Math.floor(progress * 10)];
  }

  return (
    <LinearProgress
      animation={{ duration: 1 }}
      color={barColor()}
      style={styles.container}
      varient='determinate'
      value={progress}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: 15,
  },
});
