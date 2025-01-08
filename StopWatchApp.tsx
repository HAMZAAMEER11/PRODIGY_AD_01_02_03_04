import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const StopwatchApp = () => {
  const [milliseconds, setMilliseconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (!running) {
      setRunning(true);
      intervalRef.current = setInterval(() => {
        setMilliseconds((prev) => prev + 10);
      }, 10);
    }
  };

  const pauseTimer = () => {
    if (running) {
      setRunning(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  const resetTimer = () => {
    pauseTimer();
    setMilliseconds(0);
  };

  const formatTime = (time: number) => {
    const ms = time % 1000;
    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / 60000);

    const msString = Math.floor(ms / 10).toString().padStart(2, '0');
    const secondsString = seconds.toString().padStart(2, '0');
    const minutesString = minutes.toString().padStart(2, '0');

    return `${minutesString}:${secondsString}:${msString}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stopwatch</Text>
      <Text style={styles.timer}>{formatTime(milliseconds)}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.startButton]} onPress={startTimer}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.pauseButton]} onPress={pauseTimer}>
          <Text style={styles.buttonText}>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetTimer}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '30%',
  },
  startButton: {
    backgroundColor: '#28a745',
  },
  pauseButton: {
    backgroundColor: '#ffc107',
  },
  resetButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StopwatchApp;
